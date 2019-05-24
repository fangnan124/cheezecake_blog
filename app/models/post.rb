class Post < ApplicationRecord
  validates :title, length: { in: 3..50 }
end
