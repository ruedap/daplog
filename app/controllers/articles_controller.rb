class ArticlesController < ApplicationController
  def index
    path = "#{Rails.root}/app/articles/*.md"
    @article_data_array = []
    Dir.glob(path).each do |p|
      @article_data_array << parse_article(p)
    end
    @article_data_array.sort! {|a,b| b[:time] <=> a[:time] }
  end

  def show
    parse_hatena_blog_url(params) if params[:datetime]
    year   = params[:year]
    month  = params[:month]
    day    = params[:day]
    title  = params[:title]
    path   = "#{Rails.root}/app/articles/#{year}-#{month}-#{day}-#{title}.md"
    @article_data = parse_article(path)
  rescue
    raise ActionController::RoutingError.new('Not Found')
  end

  private

  def read_file(path)
    File.open(path) {|f| f.read }
  end

  def parse_markdown(markdown)
    RubyFrontMatter::Parser.new.parse(markdown)
  end

  def parse_article(path)
    article_data = {}
    md = parse_markdown(read_file(path))
    front_matter = md.first
    article_data[:path]  = path
    article_data[:title] = front_matter['title']
    article_data[:date]  = front_matter['date'].iso8601.gsub('-', '.')
    article_data[:time]  = front_matter['date'].to_time.iso8601
    article_data[:body]  = Kramdown::Document.new(md.last).to_html
    article_data
  end

  def parse_hatena_blog_url(params)
    datetime = params[:datetime]
    params[:year]  = datetime[0..3]
    params[:month] = datetime[4..5]
    params[:day]   = datetime[6..7]
    params[:title] = params[:title].gsub('_', '-')
  end
end
