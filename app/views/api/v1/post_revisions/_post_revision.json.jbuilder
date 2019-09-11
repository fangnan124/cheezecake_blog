json.merge! post_revision.attributes
json.created_time_ago time_ago_in_words(post_revision.created_at)
