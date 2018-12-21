User.create(email: 'writer01@cheezecake.com', password: 'Cheeze1234', role: 'writer')

# Sample data
if Rails.env.development?
  User.create(email: 'reader01@cheezecake.com', password: 'Cheeze1234', role: 'reader')

  Post.create(title: "How to be better?", content: "It's a mystery, but at the same time it's interesting.")
  Post.create(title: "Life is good, right?", content: "Depends on how you think, just relax and flex.")
  Post.create(title: "So complex", content: "Ah haa?")
end