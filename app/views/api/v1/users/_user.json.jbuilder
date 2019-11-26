json.id               user.id
json.name             user.name
json.email            user.email
json.role             user.role
json.created_time_ago time_ago_in_words(user.created_at)
json.updated_time_ago time_ago_in_words(user.updated_at)
json.avatar_url       user.avatar_url(300)
