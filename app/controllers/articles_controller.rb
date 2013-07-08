class ArticlesController < ApplicationController
  def show
    year  = params[:year]
    month = params[:month]
    day   = params[:day]
    title = params[:title]
    path = "#{Rails.root}/app/articles/#{year}-#{month}-#{day}-#{title}.md"
    md = File.open(path) {|f| f.read }
    md = RubyFrontMatter::Parser.new().parse(md)
    front_matter = md.first
    @article_title = front_matter['title']
    @article_date  = front_matter['date'].iso8601.gsub('-', '.')
    @article_time  = front_matter['date'].to_time.iso8601
    @article_body  = Kramdown::Document.new(md.last).to_html
  rescue
    raise ActionController::RoutingError.new('Not Found')
  end
end
