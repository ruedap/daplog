require 'spec_helper'

describe SassCustomFunctions do
  before do
    @articles = Kazetachinu.create_articles(11)
  end

  describe '#gradient_count' do
    it '記事の総数と西暦の数の総数を取得できる' do
      extend SassCustomFunctions
      size = @articles.size
      size += @articles.map { |a| a.published_at.year }.uniq.size
      expectation = Sass::Script::Number.new(size)
      expect(gradient_count).to eq(expectation)
    end
  end
end
