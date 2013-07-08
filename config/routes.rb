Daplog::Application.routes.draw do
  get ':year/:month/:day/:title/' => 'articles#show',
      constraints: { year: /20\d{2}/, month: /[01]?\d/, day: /[0-3]?\d/ }

  root 'articles#index'
end
