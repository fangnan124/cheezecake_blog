json.data do
  json.posts @posts do |post|
    json.id      post.id
    json.title   post.title
    json.content post.content
  end
end
