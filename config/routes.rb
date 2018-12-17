Rails.application.routes.draw do
  root 'page#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts
    end
  end

  get '*path', to: 'page#index'
end
