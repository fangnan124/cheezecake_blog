class Tag < ApplicationRecord
  # Associations
  has_many :post_tag_rels
  has_many :posts, through: :post_tag_rels

  # Scopes
  scope :posts, ->{ eager_load(:posts) }

  # Validations

  # Callbacks

  # Class methods

  # Instance methods
end
