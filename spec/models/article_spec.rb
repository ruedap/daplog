require 'spec_helper'

describe Article do
  before(:all) do
    Article.rebuild!
    @glob_articles = glob_articles
  end

  describe '.flushdb!' do
    before do
      @redis = Article.redis
      @redis.set('hoge', 'fuga')
    end

    it 'Redis.currentが空であること' do
      expect(@redis.keys).not_to be_empty
      Article.flushdb!
      expect(@redis.keys).to be_empty
    end

    after { Article.rebuild! }
  end

  describe '.load_article' do
    before do
      Article.flushdb!
      path = "#{Rails.root}/app/articles/2011-08-11-uhloop.md"
      @article = Article.load_article(path)
    end

    it '戻り値のArtcileオブジェクトに適切なデータが含まれていること' do
      expect(@article.body.lines.first).to eq("<p><a href=\"/2011/08/07/reizouko-driven-development\">冷蔵庫で設計</a>したWebサービス、宇多田ヒカル大好き専用「<a href=\"http://uhloop.com\">ウタダヒカループ</a>」を8月8日にリリースしました。</p>\n")
      expect(@article.body.lines.last).to eq("</div>\n")
      expect(@article.title).to eq("<span>宇多田ヒカル大好き専用</span><span>「ウタダヒカループ」を作ってみた</span>")
      expect(@article.url).to eq("2011/08/11/uhloop")
      expect(@article.path).to eq("2011-08-11-uhloop")
      expect(@article.published_at).to eq(DateTime.new(2011, 8, 11))
      expect(@article.id).to eq(1)
    end

    after { Article.rebuild! }
  end

  describe '.rebuild' do
    it '複数回実行しても記事の全件数が変わらないこと' do
      expect(Article.all.size).to eq(@glob_articles.size)
      Article.rebuild!
      expect(Article.all.size).to eq(@glob_articles.size)
    end
  end

  describe '.list' do
    it 'ソートされた日付が正しいこと' do
      list = Article.list
      expect(list.first.published_at).to eq(DateTime.new(2010, 8, 1))
      expect(list[100].published_at).to eq(DateTime.new(2011, 3, 19))
      expect(list[187].published_at).to eq(DateTime.new(2013, 9, 17))
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
