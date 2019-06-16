json.data do
  json.invitation_request do
    json.partial! 'invitation_request', invitation_request: @invitation_request
  end
end
