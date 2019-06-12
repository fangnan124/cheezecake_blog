json.data do
  json.user do
    json.partial! 'user', user: @user
  end
end
