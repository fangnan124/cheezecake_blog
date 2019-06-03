class Post < ApplicationRecord
  # Associations
  has_many :post_tag_rels
  has_many :tags, through: :post_tag_rels
  has_many :comments

  accepts_nested_attributes_for :post_tag_rels, allow_destroy: true

  # Scopes
  scope :tags, -> { eager_load(:tags) }

  # Validations
  validates :title, length: { in: 3..50 }

  # Callbacks

  # Class methods

  # Instance methods
end
