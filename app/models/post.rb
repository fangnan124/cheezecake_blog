class Post < ApplicationRecord
  validates :title, length: { in: 10..50 }
end
