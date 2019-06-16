json.data do
  json.comments do
    json.array! @comments, partial: 'comment', as: :comment
  end
  json.currentPage @comments.current_page
  json.totalPages @comments.total_pages
  json.policy do
    json.create policy(@comments).create?
  end
end
