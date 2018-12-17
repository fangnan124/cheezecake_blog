class ApiController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def render_unprocessable_entity(exception)
    render json: {
      errors: exception.record.errors.to_hash(true)
    }, status: :unprocessable_entity
  end
end
