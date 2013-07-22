Daplog::Application.routes.draw do
  get ':year/:month/:day/:title', to: 'articles#show',
      constraints: { year: /20\d{2}/, month: /[01]\d/, day: /[0-3]\d/ }

  # はてなブログの旧URLの中でファイル名を変更した記事URLへの対応
  get 'entry/20110106/windowx_postgresql_xampp_php',
      to: redirect('/2011/01/06/windows-postgresql-xampp-php')

  # はてなブログの旧URL
  get 'entry/:date/:title', to: 'articles#show',
      constraints: { date: /20\d{2}[01]\d[0-3]\d/ }

  root 'articles#index'
end
