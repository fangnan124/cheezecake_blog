# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
  # Associations
  has_many :post_tag_rels
  has_many :posts, through: :post_tag_rels

  # Scopes
  scope :posts, -> { eager_load(:posts) }

  # Validations

  # Callbacks

  # Class methods

  # Instance methods
end
