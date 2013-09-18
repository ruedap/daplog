class ArticlesController < ApplicationController
  before_action :set_hue

  def index
    @articles = Article.index
  end

  def show
    # TODO
    parse_hatena_blog_entry_url(params) if params[:yyyymmdd]
    redirect_hatena_blog_entries_url(params) if params[:entries]

    year   = params[:year]
    month  = params[:month]
    day    = params[:day]
    title  = params[:title]
    path   = "#{year}-#{month}-#{day}-#{title}"
    set_canonical(year, month, day, title)
    @article = Article.first(path: path)
  end

#   def feed
#     @recent_entries = []
#     Article.fetch_articles.first(10).each do |article|
#       @recent_entries << Article.fetch_article(article[:path])
#     end
#     render :feed, handlers: :builder, formats: :xml
#   end

  private
  def set_hue
    @hue = "%03d" % (rand(18) * 20)
  end

  def parse_hatena_blog_entry_url(params)
    yyyymmdd = params[:yyyymmdd]
    params[:year]  = yyyymmdd[0..3]
    params[:month] = yyyymmdd[4..5]
    params[:day]   = yyyymmdd[6..7]
    params[:title] = params[:title].gsub('_', '-')
    params
  end

  def set_canonical(year, month, day, title)
    @canonical = "#{root_url}#{year}/#{month}/#{day}/#{title}"
  end

  def redirect_hatena_blog_entries_url(params)
    md = nil
    Article.fetch_articles.each do |article|
      md = /#{params[:year]}-#{params[:month]}-#{params[:day]}-(.+)\.md/.match(
        article[:path]
      )
      break if md && md[1]
    end

    raise ActionController::RoutingError unless md || md[1]

    params[:title] = md[1]
    redirect_to(
      "/#{params[:year]}/#{params[:month]}/#{params[:day]}/#{params[:title]}",
      status: 301
    )
  end
end
