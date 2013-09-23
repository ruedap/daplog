require 'spec_helper'

describe SassCustomFunctions do
  before { extend SassCustomFunctions }

  describe '#gradient_size' do
    it '記事の総数と西暦の数の総数を取得できる' do
      articles = Kazetachinu.create_articles
      size = articles.size
      size += articles.map { |a| a.published_at.year }.uniq.size
      expectation = Sass::Script::Number.new(size)
      expect(gradient_size).to eq(expectation)
    end
  end

  describe '#rails_env' do
    it '環境変数RAILS_ENVの値を取得できる' do
      expectation = Sass::Script::String.new(ENV['RAILS_ENV'])
      expect(rails_env).to eq(expectation)
    end
  end
end
