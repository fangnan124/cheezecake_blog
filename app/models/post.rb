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
  has_one_attached :image

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
  before_save do
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    self.content_plain_text = markdown.render(content).gsub(/(\r\n|\r|\n)/, ' ')
  end

  # Class methods

  # Instance methods
end
