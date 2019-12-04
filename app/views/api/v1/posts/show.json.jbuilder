json.meta do
  json.status '200'
end
json.data do
  json.post do
    json.partial! 'post', post: @post
  end
end
