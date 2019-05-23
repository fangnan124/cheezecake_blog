json.data do
  json.posts do
    json.array! @posts, partial: 'post', as: :post
  end
  json.currentPage @posts.current_page
  json.totalPages @posts.total_pages
  json.policy do
    json.edit policy(Post.new).edit?
    json.new  policy(Post.new).new?
  end
end
