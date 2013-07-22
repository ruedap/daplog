require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test 'routes test' do
    assert_generates '/', controller: 'articles', action: 'index'
    # assert_generates '/2011/08/11/uhloop', controller: 'articles', action: 'show'
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

  test '不正な記事URLにアクセスすると`ActionController::RoutingError`であること' do
    invalid_article_paths.each do |path|
      assert_raise(ActionController::RoutingError) do
        get "#{path}"
      end
    end
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
      /201/08/01/hoge
      /2013/8/01/hoge
      /2013/08/1/hoge
      /2013/08/01/hoge/fuga
    )
  end
end
