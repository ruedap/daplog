Daplog::Application.routes.draw do
  get ':year/:month/:day/:title/' => 'articles#show',
      constraints: { year: /20\d{2}/, month: /[01]?\d/, day: /[0-3]?\d/ }

  # hatena-blog url
  get 'entry/:date/:title/' => 'articles#show',
      constraints: { date: /20\d{2}[01]\d[0-3]\d/ }

  root 'articles#index'
end
