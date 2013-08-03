Daplog::Application.routes.draw do

  root 'articles#index'

  # article
  regexp_year  = /20\d{2}/
  regexp_month = /[01]\d/
  regexp_day   = /[0-3]\d/
  get '/:year/:month/:day/:title', to: 'articles#show',
      constraints: { year: regexp_year, month: regexp_month, day: regexp_day }

  # feed
  get '/feed', to: 'articles#feed'
  get '/rss', to: redirect('/feed')

  # はてなブログの旧URLの中でファイル名を変更した記事URLへの対応
  get '/entry/20110106/windowx_postgresql_xampp_php',
      to: redirect('/2011/01/06/windows-postgresql-xampp-php')

  # はてなブログの旧URL
  regexp_yyyymmdd = /20\d{2}[01]\d[0-3]\d/
  get '/entry/:yyyymmdd/:title', to: 'articles#show',
      constraints: { yyyymmdd: regexp_yyyymmdd }
  get '/touch/entry/:yyyymmdd/:title', to: 'articles#show',
      constraints: { yyyymmdd: regexp_yyyymmdd }
  get '/comments/:yyyymmdd/:title', to: 'articles#show',
      constraints: { yyyymmdd: regexp_yyyymmdd }
  get '/:entries/:year/:month/:day', to: 'articles#show',
      constraints: { entries: /entries/, # コントローラー内でのフラグ用
                     year: regexp_year, month: regexp_month, day: regexp_day }

  # はてなブログの旧URL（該当するページが無い場合はトップへリダイレクト）
  get '/archive', to: redirect('/')
  get '/archive/*path/', to: redirect('/')
  get '/category', to: redirect('/')
  get '/category/*path/', to: redirect('/')
  get '/search', to: redirect('/')

end
