module SassCustomFunctions
  def gradient_count
    articles = Article.all
    size = articles.size
    size += articles.all.map { |a| a.published_at.year }.uniq.size
    Sass::Script::Number.new(size)
  end
end

module Sass::Script::Functions
  include SassCustomFunctions
end
