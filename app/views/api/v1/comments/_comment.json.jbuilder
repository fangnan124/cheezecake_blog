json.merge! comment.attributes
json.user do
  json.id    comment.user.id
  json.email comment.user.email
  json.name  comment.user.name
end
json.created_time_ago time_ago_in_words(comment.created_at)
json.updated_time_ago time_ago_in_words(comment.updated_at)
