json.merge! post.attributes
json.tags do
  json.array! post.post_tag_rels do |post_tag_rel|
    json.rel_id post_tag_rel.id
    json.id     post_tag_rel.tag.id
    json.name   post_tag_rel.tag.name
    json.color  post_tag_rel.tag.color
  end
end
json.description      truncate(post.content_plain_text, length: 150, escape: false)
json.comments_count   post.comments.count
json.thumb_url        post.image.attached? ? url_for(post.image.variant(resize: '500x500')) : image_path('netherlands.jpg')
json.image_url        post.image.attached? ? url_for(post.image.variant(resize: '1000x1000')) : image_path('netherlands.jpg')
json.created_time_ago time_ago_in_words(post.created_at)
json.updated_time_ago time_ago_in_words(post.updated_at)
