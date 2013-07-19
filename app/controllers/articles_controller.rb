class ArticlesController < ApplicationController
  before_action :set_hue

  def index
    @articles = fetch_articles
  end

  def show
    parse_hatena_blog_url(params) if params[:hatena_datetime]
    year   = params[:year]
    month  = params[:month]
    day    = params[:day]
    title  = params[:title]
    path   = "#{Rails.root}/app/articles/#{year}-#{month}-#{day}-#{title}.md"
    @article = fetch_article(path)
  end

  private

  def set_hue
    @hue = "%03d" % (rand(18) * 20)
  end

  def fetch_articles
    articles = REDIS.get('articles')
    if articles.present?
      result = []
      JSON.parse(articles).each do |hash|
        result << hash.symbolize_keys
      end
      return result
    else
      return read_articles
    end
  end

  def read_articles
    path = "#{Rails.root}/app/articles/*.md"
    articles = []
    Dir.glob(path).each do |p|
      articles << read_article(p, false)
    end
    articles.sort! {|a,b| b[:time] <=> a[:time] }
    redis_set('articles', articles)
    articles
  end

  def fetch_article(path)
    article = REDIS.get(path)
    if article.present?
      result = JSON.parse(article).symbolize_keys
      return result
    else
      return read_article(path)
    end
  end

  def redis_set(key, value)
    REDIS.set(key, value.to_json)
    expire_time = Rails.env.development? ? 10.seconds : 1.hour
    REDIS.expireat(key, (Time.now + expire_time).to_i)
  end

  def read_file(path)
    File.open(path) {|f| f.read }
  end

  def parse_markdown(markdown)
    RubyFrontMatter::Parser.new.parse(markdown)
  end

  def read_article(path, is_body = true)
    article = {}
    md = parse_markdown(read_file(path))
    front_matter = md.first
    article[:path]  = path
    article[:title] = front_matter['title']
    article[:date]  = front_matter['date'].iso8601.gsub('-', '.')
    article[:time]  = front_matter['date'].to_time.iso8601
    if is_body
      options = { coderay_css: :class,
                  coderay_line_numbers: nil,
                  coderay_wrap: :div }
      article[:body] = Kramdown::Document.new(md.last, options).to_html
    end
    redis_set(article[:path], article)
    article
  end

  def parse_hatena_blog_url(params)
    datetime = params[:hatena_datetime]
    params[:year]  = datetime[0..3]
    params[:month] = datetime[4..5]
    params[:day]   = datetime[6..7]
    params[:title] = params[:title].gsub('_', '-')
  end
end
