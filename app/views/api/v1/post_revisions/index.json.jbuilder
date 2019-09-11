json.data do
  json.post_revisions do
    json.array! @post_revisions, partial: 'post_revision', as: :post_revision
  end
  json.currentPage @post_revisions.current_page
  json.totalPages @post_revisions.total_pages
end
