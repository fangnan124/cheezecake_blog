json.data do
  json.post_revision do
    json.partial! 'post_revision', post_revision: @post_revision
  end
end
