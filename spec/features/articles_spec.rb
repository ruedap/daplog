require 'spec_helper'

feature '記事一覧の表示' do
  scenario '記事一覧を表示する（3件）' do
    Kazetachinu.create_articles(3)
    visit root_path

    expect(page).to have_title(blog_title)

    expect(page).to have_css('h1', text: blog_title)
    expect(page).to have_css('footer', text: 'ルエダップコム')

    expect(page).to have_css('li.article-list__year', text: '2010')
    expect(page).not_to have_css('li.article-list__year', text: '2011')
    expect(page).not_to have_css('li.article-list__year', text: '2012')
    expect(page).not_to have_css('li.article-list__year', text: '2013')

    expect(page).to have_css('b', text: 'MacPortsのインストール')
    expect(page).to have_css('b', text: 'VimperatorのfでMigemo絞り込み')
    expect(page).to have_css('b', text: 'Vimperatorのfで表示するヒントのフォントサイズを大きくする')
    expect(page).not_to have_css('b', text: 'VimperatorでMacVimをset editorするためにmvimを導入')
    expect(page).not_to have_css('b', text: '宇多田ヒカル大好き専用「ウタダヒカループ」を作ってみた')
  end

  scenario '記事一覧を表示する（全件）' do
    Article.rebuild!
    visit root_path

    expect(page).to have_title(blog_title)

    expect(page).to have_css('h1', text: blog_title)
    expect(page).to have_css('footer', text: 'ルエダップコム')

    expect(page).to have_css('li.article-list__year', text: '2010')
    expect(page).to have_css('li.article-list__year', text: '2011')
    expect(page).to have_css('li.article-list__year', text: '2013')
    expect(page).not_to have_css('li.article-list__year', text: '2012')

    expect(page).to have_css('b', text: 'MacPortsのインストール')
    expect(page).to have_css('b', text: 'VimperatorのfでMigemo絞り込み')
    expect(page).to have_css('b', text: 'Vimperatorのfで表示するヒントのフォントサイズを大きくする')
    expect(page).to have_css('b', text: 'VimperatorでMacVimをset editorするためにmvimを導入')
    expect(page).to have_css('b', text: '宇多田ヒカル大好き専用「ウタダヒカループ」を作ってみた')
    expect(page).to have_css('b', text: 'イマココ')
    expect(page).not_to have_css('b', text: '風立ちぬ いざ生きめやも')
  end
end

feature '記事詳細の表示' do
  scenario '記事詳細を表示する' do
    Kazetachinu.create_articles(3)
    visit root_path
    click_link 'MacPortsのインストール'

    expect(page).to have_title(blog_title)

    expect(page).to have_css('h1', text: blog_title)
    expect(page).to have_css('footer', text: 'ルエダップコム')
    expect(page).not_to have_css('li.article-list__year', text: '2010')

    expect(page).to have_css('h1', text: 'MacPortsのインストール')
    expect(page).to have_css('section.article-body > p', text: 'いろいろインストールするのに便利なMacPortsをインストールする。')
  end
end

feature 'フィードの表示' do
  scenario 'フィードを表示する' do
    articles = Kazetachinu.create_articles(11)
    visit '/feed'

    expect(page).to have_css('feed > title', text: blog_title)
    expect(page).to have_css('feed > subtitle', text: blog_description)
    expect(page).to have_css('author > name', text: blog_author)
    expect(page).to have_css('entry > updated',
      text: articles.last.published_at.to_s)
    expect(page).to have_css('entry > published',
      text: articles.last.published_at.to_s)
    expect(page).not_to have_css('entry > updated',
      text: articles.first.published_at.to_s)
    expect(page).not_to have_css('entry > published',
      text: articles.first.published_at.to_s)
    # TODO: strip_tags (ArticlesHelper) が必要なタイトルのテスト
    expect(page).to have_css('entry > title', text: articles.last.title)
    expect(page).not_to have_css('entry > title', text: articles.first.title)
    # TODO: content のテスト
    # expect(page).to have_css('entry > content', text: articles.last.body)
  end
end

feature '存在しないページにアクセスする' do
  scenario 'ステータスコード500が返る' do
    visit '/2013/01/01/invalid_url'
    # TODO: 404が返るように
    expect(page.status_code).to eq(500)
    # expect(page).to have_text('ページがありません。')
    # expect(page).to have_link('home', href: root_path)
  end
end
