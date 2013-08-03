require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test 'rootのroutesがarticles#indexであること' do
    assert_generates '/', controller: 'articles', action: 'index'
  end

  test '記事のURLのレスポンスが200であること' do
    article_paths.each do |path|
      get "#{path}"
      assert_response 200
    end
  end

  test '記事のURL末尾にスラッシュがあるとスラッシュなしのURLに301リダイレクトされること' do
    article_paths.each do |path|
      get "#{path}/"
      assert_redirected_to "#{path}"
      assert_response 301
    end
  end

  test 'はてなブログの記事URLのレスポンスが200であること' do
    article_paths.each do |path|
      path.sub!(/.+?(\d{4})\/(\d{2})\/(\d{2})\/(.+?)/, "\/entry\/\\1\\2\\3\/\\4")
      path.gsub!('-', '_')
      get "#{path}"
      assert_response 200
    end
  end

  test 'はてなブログのスマホ用記事URLのレスポンスが200であること' do
    article_paths.each do |path|
      path.sub!(/.+?(\d{4})\/(\d{2})\/(\d{2})\/(.+?)/, "\/touch\/entry\/\\1\\2\\3\/\\4")
      path.gsub!('-', '_')
      get "#{path}"
      assert_response 200
    end
  end

  test 'はてなブログのコメント用記事URLのレスポンスが200であること' do
    article_paths.each do |path|
      path.sub!(/.+?(\d{4})\/(\d{2})\/(\d{2})\/(.+?)/, "\/comments\/\\1\\2\\3\/\\4")
      path.gsub!('-', '_')
      get "#{path}"
      assert_response 200
    end
  end

  test 'はてなブログのエントリー用記事URLが301リダイレクトされること' do
    article_paths.each do |path|
      entries_path = path.sub(/.+?(\d{4})\/(\d{2})\/(\d{2})\/.+/, "\/entries\/\\1\/\\2\/\\3")
      get "#{entries_path}"
      assert_redirected_to path
      assert_response 301
    end
  end

  test 'はてなブログの記事URLから変更したURLが301リダイレクトされること' do
    get '/entry/20110106/windowx_postgresql_xampp_php'
    assert_redirected_to '/2011/01/06/windows-postgresql-xampp-php'
    assert_response 301
  end

  test 'はてなブログの旧URLで該当ページが無い場合はトップページに301リダイレクトされること' do
    hatena_blog_paths = %w(
      /archive
      /archive/category/ruby
      /archive/2011/7
      /category
      /category/vim
      /search
    )
    hatena_blog_paths.each do |path|
      get "#{path}"
      assert_redirected_to '/'
      assert_response 301
    end
  end

  test '不正な記事URLにアクセスすると`ActionController::RoutingError`であること' do
    invalid_article_paths.each do |path|
      assert_raise(ActionController::RoutingError) do
        get "#{path}"
      end
    end
  end

  test '`/feed`のレスポンスが200であること' do
    get '/feed'
    assert_response 200
  end

  test '`/rss`のレスポンスが301であること' do
    get '/rss'
    assert_response 301
  end

  private
  def article_paths
    path = "#{Rails.root}/app/articles/*.md"
    paths = Dir.glob(path)
    paths.map do |p|
      result = p.scan(/(\/20\d{2}\-[01]\d\-[0-3]\d\-.+?)\.md/).flatten.shift
      result.sub(/(\d{4})-(\d{2})-(\d{2})-(.+?)/, "\\1\/\\2\/\\3\/\\4")
    end
  end

  def invalid_article_paths
    %w(
      /201/07/26/reboooot
      /2013/7/26/reboooot
      /2013/07/2/reboooot
      /2013/07/26/reboooot/fuga
      /post/20110811/uhloop
      /iphone/entry/20110811/uhloop
      /comment/20110811/uhloop
    )
  end
end
