json.data do
  json.comment do
    json.partial! 'comment', post: @comment
  end
end
