class ApiController < ActionController::API
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  include LetterAvatar::AvatarHelper

  # # json layout
  # include ActionController::ImplicitRender
  # include ActionView::Layouts
  # layout 'application'

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from Pundit::NotAuthorizedError, with: :render_not_authorized_error

  before_action :configure_permitted_parameters, if: :devise_controller?

  def render_unprocessable_entity(exception)
    render json: {
      errors: exception.record.errors.to_hash(true)
    }, status: :unprocessable_entity
  end

  def render_new_error
    puts 'render_new_error'
  end

  def render_create_success
    puts 'render_create_success'
  end

  def render_create_error_not_confirmed
    puts 'render_create_error_not_confirmed'
  end

  def render_create_error_bad_credentials
    puts 'render_create_error_bad_credentials'
  end

  def render_destroy_success
    puts 'render_destroy_success'
  end

  def render_destroy_error
    puts 'render_destroy_error'
  end

  # def render_validate_token_success
  #   puts 'render_validate_token_success'
  # end

  def render_validate_token_error
    puts 'render_validate_token_error'
  end

  def render_not_authorized_error
    render json: {
      meta: {
          status: '401'
      },
      errors: ['Not authorized']
    }, status: :unauthorized
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :invitation_code])
  end
end
