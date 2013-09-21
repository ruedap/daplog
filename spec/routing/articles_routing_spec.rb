require 'spec_helper'

describe ArticlesController do
  describe 'routing' do
    it '`#index`にルーティングされる' do
      expect(get('/')).to route_to('articles#index')
      expect(get('/articles')).not_to be_routable
    end

    describe '#show' do
      it '`#show`にルーティングされない' do
        expect(get('/articles/1')).not_to be_routable
      end

      context 'URL末尾スラッシュなしの記事URLにアクセスする' do
        it '`#show`にルーティングされる' do
          # TODO: redirect_to
          expect(get('/2011/08/11/uhloop/')).to route_to('articles#show',
            year: '2011', month: '08', day: '11', title: 'uhloop')
          expect(get('/articles/1/')).not_to be_routable
        end
      end

      context 'URL末尾スラッシュありの記事URLにアクセスする' do
        it '`#show`にルーティングされる' do
          expect(get('/2011/08/11/uhloop')).to route_to('articles#show',
            year: '2011', month: '08', day: '11', title: 'uhloop')
        end
      end

      context 'はてなブログの記事URLにアクセスする' do
        it '`#show`にルーティングされる' do
          expectation = { controller: 'articles', action: 'show',
                          yyyymmdd: '20110811', title: 'uhloop' }
          # 通常時
          expect(get('/entry/20110811/uhloop')).to route_to(expectation)
          # コメント用
          expect(get('/comments/20110811/uhloop')).to route_to(expectation)
          # スマホ用
          expect(get('/touch/entry/20110811/uhloop')).to route_to(expectation)

          # TODO: redirect_to
          # 一覧用
          expect(get('/entries/2011/08/11')).to route_to('articles#show',
            entries: 'entries', year: '2011', month: '08', day: '11')
        end

        xit '`#index`にルーティングされる' do
          # TODO: redirect_to
          expectation = 'articles#index'
          expect(get('/archive')).to redirect_to(expectation)
          expect(get('/archive/category/ruby')).to redirect_to(expectation)
          expect(get('/archive/2011/7')).to redirect_to(expectation)
          expect(get('/category')).to redirect_to(expectation)
          expect(get('/category/vim')).to redirect_to(expectation)
          expect(get('/search')).to redirect_to(expectation)
        end
      end

      context '存在しない記事URLにアクセスする' do
        it 'ルーティングされない' do
          Kazetachinu.invalid_article_paths.each do |path|
            expect(get(path)).not_to be_routable
          end
        end
      end
    end

    describe '#feed' do
      it '`#feed`にルーティングされる' do
        expect(get('/feed')).to route_to('articles#feed')
      end

      xit '`#feed`にリダイレクトされる' do
        # TODO: redirect_to
        expect(get('/rss')).to redirect_to('articles#feed')
        expect(get('/feed/category/mac')).to redirect_to('articles#feed')
        expect(get('/rss/category/vim')).to redirect_to('articles#feed')
      end
    end
  end
end
