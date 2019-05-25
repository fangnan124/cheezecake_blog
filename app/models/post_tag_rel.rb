class PostTagRel < ApplicationRecord
  belongs_to :post
  belongs_to :tag
end
