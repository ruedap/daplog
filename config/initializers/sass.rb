module SassCustomFunctions

  # Public: 記事一覧のグラデーション表現に必要な数値を返します。
  # 数値は、ローカルのMarkdownファイルの数と記事の西暦の種類数を足したものです。
  #
  # 数値をSass::Script::Numberで返します。
  def gradient_size
    articles = Article.glob_article_years
    size = articles.size        # 記事の数
    size += articles.uniq.size  # 西暦の数
    Sass::Script::Number.new(size)
  end

  # Public: 環境変数RAILS_ENVの値を文字列で返します。
  #
  # 文字列をSass::Script::Stringで返します。
  def rails_env
    str = ENV['RAILS_ENV']
    str = 'staging' if ENV['TRAVIS'] == 'true' && \
      ENV['TRAVIS_BRANCH'] != 'master'
    Sass::Script::String.new(str)
  end
end

module Sass::Script::Functions
  include SassCustomFunctions
end
