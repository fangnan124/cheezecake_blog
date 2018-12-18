json.data do
  json.posts @posts do |post|
    json.id      post.id
    json.title   post.title
    json.content post.content
  end
  json.currentPage @posts.current_page
  json.totalPages @posts.total_pages
end
