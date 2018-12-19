Rails.application.routes.draw do
  root 'page#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        confirmations:      'api/v1/auth/confirmations',
        passwords:          'api/v1/auth/passwords',
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
        registrations:      'api/v1/auth/registrations',
        sessions:           'api/v1/auth/sessions',
        token_validations:  'api/v1/auth/token_validations'
      }

      resources :posts
    end
  end

  get '*path', to: 'page#index'
end
