json.data do
  json.post do
    json.partial! 'post', post: @post
  end
end
