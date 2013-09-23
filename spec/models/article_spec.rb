require 'spec_helper'

describe Article do
  before { Redis.current.flushdb }

  describe '.flushdb!' do
    before do
      @redis = Article.redis
      @redis.set('hoge', 'fuga')
    end

    it 'Redis.currentが空である' do
      expect(@redis.keys).not_to be_empty
      Article.flushdb!
      expect(@redis.keys).to be_empty
    end
  end

  describe '.create_article' do
    context '引数が正常な場合' do
      it '戻り値のArtcileオブジェクトに適切なデータが含まれている' do
        uhloop  = Kazetachinu.attrs(:uhloop)
        path = "#{Rails.root}/app/articles/#{uhloop.filename}.md"
        article = Article.create_article(path)
        expect(article.body.lines.first).to eq(uhloop.body_first)
        expect(article.body.lines.last).to eq(uhloop.body_last)
        expect(article.title).to eq(uhloop.title)
        expect(article.url).to eq(uhloop.url)
        expect(article.filename).to eq(uhloop.filename)
        expect(article.published_at).to eq(uhloop.published_at)
        expect(article.id).to eq(uhloop.id)
      end
    end

    context '引数が異常な場合' do
      it '戻り値にnilが返る' do
        path = "#{Rails.root}/app/articles/0000-00-00-invalid-filename.md"
        expect(Article.create_article(path)).to be_nil
      end
    end
  end

  describe '.rebuild!' do
    it '複数回実行しても記事の全件数が変わらない' do
      expect(Article.all.size).to eq(0)
      glob_paths_size = Kazetachinu.create_articles.size
      result = Article.rebuild!
      expect(Article.all.size).to eq(glob_paths_size)
      expect(result).to eq(glob_paths_size)
      result = Article.rebuild!
      expect(Article.all.size).to eq(glob_paths_size)
      expect(result).to eq(glob_paths_size)
    end
  end

  describe '.index' do
    it 'ソートされた日付が正しい' do
      Kazetachinu.create_articles(10)
      index = Article.index
      expect(index.size).to eq(10)
      expect(index.first.published_at).to eq(DateTime.new(2010, 9, 13))
      expect(index.last.published_at).to eq(DateTime.new(2010, 8, 1))
    end
  end

  describe '.glob_article_years' do
    it 'ローカルから取得した全記事の総数と西暦部分の抽出の総数が同じ' do
      expectation = Kazetachinu.create_articles.size
      actual = Article.glob_article_years.size
      expect(actual).to eq(expectation)
    end
  end

  describe '#date' do
    before { Kazetachinu.create_articles(10) }

    it '年月日がドット区切りのフォーマットに変換されている' do
      index = Article.index
      expect(index.first.date).to eq('2010.09.13')
      expect(index.last.date).to eq('2010.08.01')
    end
  end

  describe '#url' do
    before { Kazetachinu.create_articles(1) }

    context '引数を付けない' do
      it 'root_urlを含まないパスが取得できる' do
        actual = Article.index.first.url
        expect(actual).to eq('2010/08/01/vimperator-hint-font-size')

      end
    end

    context '引数を付ける' do
      it 'root_urlを含むパスが取得できる' do
        actual = Article.index.first.url('http://blog.ruedap.com/')
        expect(actual).to eq('http://blog.ruedap.com/2010/08/01/vimperator-hint-font-size')
      end
    end
  end

  describe '#body' do
    before do
      @article = Article.create
    end

    it 'プロパティに設定した文字列を取得できる' do
      body = '風立ちぬ いざ生きめやも'
      @article.body = body
      expect(@article.body).to eq(body)
    end

    it 'プロパティに設定したnilを取得できる' do
      @article.body = nil
      expect(@article.body).to eq(nil)
    end
  end
end
