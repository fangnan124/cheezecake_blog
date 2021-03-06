json.merge! comment.attributes
json.user do
  json.id    comment.user.id
  json.email comment.user.email
  json.name  comment.user.name
  json.avatar_url comment.user.avatar_url(300)
end
json.policy do
  json.edit   policy(comment).update?
  json.delete policy(comment).delete?
end
json.created_time_ago time_ago_in_words(comment.created_at)
json.updated_time_ago time_ago_in_words(comment.updated_at)
