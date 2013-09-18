require 'test_helper'

describe Article do
  describe '.flushdb!' do
    before do
      @redis = Article.redis
      @redis.set('hoge', 'fuga')
    end

    it 'Redis.currentが空であること' do
      @redis.keys.wont_be_empty
      Article.flushdb!
      @redis.keys.must_be_empty
    end
  end

  describe '.load_article' do
    before do
      Article.flushdb!
      path = "#{Rails.root}/app/articles/2011-08-11-uhloop.md"
      @article = Article.load_article(path)
    end

    it '戻り値のArtcileオブジェクトに適切なデータが含まれていること' do
      @article.body.lines.first.must_equal "<p><a href=\"/2011/08/07/reizouko-driven-development\">冷蔵庫で設計</a>したWebサービス、宇多田ヒカル大好き専用「<a href=\"http://uhloop.com\">ウタダヒカループ</a>」を8月8日にリリースしました。</p>\n"
      @article.body.lines.last.must_equal "</div>\n"
      @article.title.must_equal "<span>宇多田ヒカル大好き専用</span><span>「ウタダヒカループ」を作ってみた</span>"
      @article.url.must_equal "2011/08/11/uhloop"
      @article.path.must_equal "2011-08-11-uhloop"
      @article.published_at.must_equal DateTime.new(2011, 8, 11)
      @article.id.must_equal 1
    end
  end

  describe '.rebuild' do
    before do
      Article.rebuild!
      @articles = glob_articles
    end

    it '複数回実行しても記事の全件数が変わらないこと' do
      Article.all.size.must_equal @articles.size
      Article.rebuild!
      Article.all.size.must_equal @articles.size
    end
  end

  describe '.list' do
    before do
      Article.rebuild!
    end

    it 'ソートされた日付が正しいこと' do
      Article.list.first.published_at.must_equal DateTime.new(2010, 8, 1)
      Article.list[100].published_at.must_equal DateTime.new(2011, 3, 19)
      Article.list[187].published_at.must_equal DateTime.new(2013, 9, 17)
    end
  end


  private
  def glob_articles
    result = []
    path = "#{Rails.root}/app/articles/*.md"
    Dir.glob(path).each do |p|
      result << File.open(p) {|f| f.read }
    end
    result
  end
end
