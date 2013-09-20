require 'spec_helper'

describe ArticlesController do
  before { Redis.current.flushdb }

  describe 'GET #index' do
    context 'データベースに記事データが1件も入ってない' do
      it 'エラーが発生する'
      it 'メンテナンス画面が表示される'
    end

    context 'データベースに記事データが1件入っている' do
      before do
        Kazetachinu.create(:uhloop)
        get :index, {}
      end

      it 'ステータスコード200を返す' do
        expect(response).to be_success
        expect(response.status).to eq(200)
      end

      it 'indexテンプレートを描画する' do
        expect(response).to render_template(:index)
      end

      it 'responds successfully with an HTTP 200 status code' do
        expect(assigns(:articles)).to be_kind_of(Array)
        expect(assigns(:articles)).to eq(Article.index)
      end
    end
  end

  describe 'GET #show' do
    context 'パラメーターの指定がない' do
      it 'エラーが発生する'
      it 'メンテナンス画面が表示される'
    end

    context 'パラメーターの指定がある' do
      context 'データベースに記事データが1件も入ってない' do
        it 'エラーが発生する'
        it 'メンテナンス画面が表示される'
      end

      context 'データベースに記事データが1件入っている' do
        before do
          @article = Kazetachinu.create(:uhloop)
          @params = { year: '2011', month: '08', day: '11', title: 'uhloop' }
        end

        it 'ステータスコード200を返す' do
          get :show, @params
          expect(response).to be_success
          expect(response.status).to eq(200)
        end

        it 'showテンプレートを描画する' do
          get :show, @params
          expect(response).to render_template(:show)
        end

        it '指定された記事データの`@article`がアサインされる' do
          get :show, @params
          article = assigns(:article)
          expect(article).to be_kind_of(Article)
          expect(article.published_at.year).to eq(@params[:year].to_i)
          expect(article.published_at.month).to eq(@params[:month].to_i)
          expect(article.published_at.day).to eq(@params[:day].to_i)
          expect(article.url).to include(@params[:title])
          expect(article.title).to eq(@article.title)
        end
      end
    end
  end

  describe 'GET #feed' do
    context 'データベースに記事データが1件も入ってない' do
      it 'エラーが発生する'
      it 'メンテナンス画面が表示される'
    end

    context 'データベースに記事データが1件入っている' do
      before do
        @articles = Kazetachinu.create_articles(11)
      end

      it 'ステータスコード200を返す' do
        get :feed, {}
        expect(response).to be_success
        expect(response.status).to eq(200)
      end

      it 'feedテンプレートを描画する' do
        get :feed, {}
        expect(response).to render_template(:feed)
      end

      it '指定された記事データを含む配列の`@recent_articles`がアサインされる' do
        get :feed, {}
        articles = assigns(:recent_articles)
        expect(articles).to be_kind_of(Array)
        expect(articles.size).to eq(10)
        expect(articles.first).to eq(@articles[-1])
        expect(articles.last).to eq(@articles[-10])
      end
    end
  end
end
