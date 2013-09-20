# 風立ちぬ いざ生きめやも
# なんちゃってFixture Replacement
module Kazetachinu
  def self.create(symbol)
    self.send(symbol)
  end

  def self.create_articles(count)
    Article.flushdb!
    glob_article_paths.first(count).map { |p| Article.create_article(p) }
  end

  def self.create_article(filename = '2011-08-11-uhloop')
    path = "#{Rails.root}/app/articles/#{filename}.md"
    Article.create_article(path)
  end

  private

  def self.glob_article_paths
    result = []
    path = "#{Rails.root}/app/articles/*.md"
    Dir.glob(path).each { |p| result << p }
    result
  end

  def self.uhloop
    create_article

    OpenStruct.new({
      id: 1,
      title: "<span>宇多田ヒカル大好き専用</span><span>「ウタダヒカループ」を作ってみた</span>",
      url: "2011/08/11/uhloop",
      filename: "2011-08-11-uhloop",
      body_first: "<p><a href=\"/2011/08/07/reizouko-driven-development\">冷蔵庫で設計</a>したWebサービス、宇多田ヒカル大好き専用「<a href=\"http://uhloop.com\">ウタダヒカループ</a>」を8月8日にリリースしました。</p>\n",
      body_last: "</div>\n",
      published_at: DateTime.new(2011, 8, 11),
    })
  end
end
