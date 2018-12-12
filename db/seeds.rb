# Sample data
if Rails.env.development?
  Post.create(title: "How to be better?", content: "It's a mystery, but at the same time it's interesting.")
  Post.create(title: "Life is good, right?", content: "Depends on how you think, just relax and flex.")
end