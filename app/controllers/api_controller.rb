class ApiController < ActionController::API
  def render_unprocessable_entity(object)
    render json: {
      errors: object.errors.to_hash(true)
    }, status: :unprocessable_entity
  end
end