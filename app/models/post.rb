class Post < ApplicationRecord
  include Elasticsearch::Model

  enum status: { published: 'published', wip: 'wip' }, _prefix: true

  # Associations
  has_many :post_tag_rels
  has_many :tags, through: :post_tag_rels
  has_many :comments

  accepts_nested_attributes_for :post_tag_rels, allow_destroy: true

  # Scopes
  scope :tags, -> { eager_load(:tags) }

  # Validations
  validates :title, length: { in: 3..80 }

  # Callbacks

  # Class methods

  # Instance methods
end

Post.__elasticsearch__.create_index! force: true
Post.import
