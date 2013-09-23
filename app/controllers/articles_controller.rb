class ArticlesController < ApplicationController
  def index
    @articles = Article.index
  end

  def show
    parse_hatena_blog_entry_url(params) if params[:yyyymmdd]
    redirect_hatena_blog_entries_url(params) if params[:entries]

    year     = params[:year]
    month    = params[:month]
    day      = params[:day]
    title    = params[:title]
    filename = "#{year}-#{month}-#{day}-#{title}"
    set_canonical(year, month, day, title)
    @article = Article.first(filename: filename)
  end

  def feed
    @recent_articles = []
    Article.index.first(10).each do |article|
      @recent_articles << article
    end
    render :feed, handlers: :builder, formats: :xml
  end

  private

  def set_canonical(year, month, day, title)
    @canonical = "#{root_url}#{year}/#{month}/#{day}/#{title}"
  end

  def parse_hatena_blog_entry_url(params)
    yyyymmdd = params[:yyyymmdd]
    params[:year]  = yyyymmdd[0..3]
    params[:month] = yyyymmdd[4..5]
    params[:day]   = yyyymmdd[6..7]
    params[:title] = params[:title].gsub('_', '-')
    params
  end

  def redirect_hatena_blog_entries_url(params)
    filename = "#{params[:year]}-#{params[:month]}-#{params[:day]}"
    article = Article.all.select { |a| a.filename.include?(filename) }.first

    redirect_to("/#{article.url}", status: 301) and return if article

    render(file: "#{Rails.root}/public/404.html", status: 404, layout: false,
      content_type: 'text/html')
  end
end
