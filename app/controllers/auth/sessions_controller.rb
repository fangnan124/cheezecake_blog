module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      @user = @resource
      render 'auth/create_success.json'
    end
  end
end
