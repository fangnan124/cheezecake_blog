# == Schema Information
#
# Table name: posts
#
#  id                 :bigint           not null, primary key
#  title              :string
#  content            :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  status             :string(20)       default("wip")
#  views              :integer          default(0), not null
#  content_plain_text :text
#

require 'redcarpet/render_strip'

class Post < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  enum status: { published: 'published', wip: 'wip' }, _prefix: true

  # Associations
  has_many :post_tag_rels
  has_many :tags, through: :post_tag_rels
  has_many :comments
  has_one_attached :image
  has_many :post_revisions

  accepts_nested_attributes_for :post_tag_rels, allow_destroy: true

  # Scopes
  scope :with_post_tag_rels, -> { eager_load(post_tag_rels: :tag) }
  scope :with_tags, -> { eager_load(:tags) }
  # scope :with_image_attachment, -> { eager_load(image_attachment: :blob) }

  # Validations
  validates :title, length: { in: 3..80 }

  # Callbacks
  before_save do
    # save content_plain_text
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    self.content_plain_text = markdown.render(content).gsub(/(\r\n|\r|\n)/, ' ')
  end

  after_save do
    # create a revision
    ids = post_revisions.order(created_at: :desc).limit(99).ids
    post_revisions.where.not(id: ids).destroy_all
    post_revisions.create(title: title, content: content)
  end

  # Class methods

  # Instance methods
end

Post.__elasticsearch__.create_index! force: true
Post.import
