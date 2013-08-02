class ArticlesController < ApplicationController
  before_action :set_hue

  def index
    @articles = fetch_articles
  end

  def show
    parse_hatena_blog_url(params) if params[:date]
    year   = params[:year]
    month  = params[:month]
    day    = params[:day]
    title  = params[:title]
    path   = "#{Rails.root}/app/articles/#{year}-#{month}-#{day}-#{title}.md"
    @article = fetch_article(path)
  end

  def feed
    @recent_entries = []
    fetch_articles.first(10).each do |article|
      @recent_entries << fetch_article(article[:path])
    end
    render :feed, handlers: :builder, formats: :xml
  end

  private
  def set_hue
    @hue = "%03d" % (rand(18) * 20)
  end

  def fetch_articles
    articles = Redis.current.get('articles')
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
    article = Redis.current.get(path)
    if article.present?
      result = JSON.parse(article).symbolize_keys
      return result
    else
      return read_article(path)
    end
  end

  def redis_set(key, value)
    Redis.current.set(key, value.to_json)
    Redis.current.expire(key, 10.seconds) if Rails.env.development?
  end

  def read_file(path)
    File.open(path) {|f| f.read }
  end

  def parse_frontmatter(markdown)
    RubyFrontMatter::Parser.new.parse(markdown)
  end

  def parse_markdown(markdown)
    options = { auto_ids: false,
                coderay_css: :class,
                coderay_line_numbers: nil,
                coderay_wrap: :div }
    Kramdown::Document.new(markdown, options).to_html
  end

  def read_article(path, is_body = true)
    article = {}
    md = parse_frontmatter(read_file(path))
    front_matter = md.first
    article[:path]  = path
    article[:url]  = generate_article_url(path)
    article[:title] = front_matter['title']
    article[:date]  = front_matter['date'].iso8601.gsub('-', '.')
    article[:time]  = front_matter['date'].to_time.iso8601
    if is_body
      article[:body] = parse_markdown(md.last)
      redis_set(article[:path], article)
    end
    article
  end

  def parse_hatena_blog_url(params)
    date = params[:date]
    params[:year]  = date[0..3]
    params[:month] = date[4..5]
    params[:day]   = date[6..7]
    params[:title] = params[:title].gsub('_', '-')
    @canonical = "#{root_url}#{params[:year]}/#{params[:month]}/#{params[:day]}/#{params[:title]}"
    params
  end

  def generate_article_url(path)
    md = /\/(20\d{2})-([01]\d)-([0-3]\d)-(.+)\.md/.match(path)
    "#{root_url}#{md[1]}/#{md[2]}/#{md[3]}/#{md[4]}"
  end
end
