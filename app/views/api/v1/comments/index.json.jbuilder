json.data do
  json.comments do
    json.array! @comments, partial: 'comment', as: :comment
  end
  json.currentPage @comments.current_page
  json.totalPages @comments.total_pages
  json.policy do
    json.edit   policy(Comment.new).edit?
    json.new    policy(Comment.new).new?
    json.create policy(Comment.new).create?
    json.delete policy(Comment.new).delete?
  end
end
