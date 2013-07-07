Daplog::Application.routes.draw do
  get 'articles/index'
  root 'articles#index'
end
