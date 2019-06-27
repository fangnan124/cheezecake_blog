json.extract! invitation_request, :id, :email, :message, :code, :status, :expire_at, :user_id, :created_at, :updated_at
json.url api_v1_invitation_request_url(invitation_request, format: :json)
