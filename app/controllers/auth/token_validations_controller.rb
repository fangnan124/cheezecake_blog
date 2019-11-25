module Auth
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    def render_validate_token_success
      @user = @resource
      render 'auth/validate_token_success.json'
    end
  end
end
