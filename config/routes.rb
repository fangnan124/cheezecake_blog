Rails.application.routes.draw do
  root 'page#index'

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    confirmations:      'auth/confirmations',
    passwords:          'auth/passwords',
    omniauth_callbacks: 'auth/omniauth_callbacks',
    registrations:      'auth/registrations',
    sessions:           'auth/sessions',
    token_validations:  'auth/token_validations'
  }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts do
        resources :comments, shallow: true
      end
      resources :tags
      resources :users
      resources :invitation_requests do
        member do
          put :approve
        end
      end
    end
  end

  get '*path', to: 'page#index'
end
