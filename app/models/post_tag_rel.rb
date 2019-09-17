# == Schema Information
#
# Table name: post_tag_rels
#
#  id      :bigint           not null, primary key
#  post_id :integer
#  tag_id  :integer
#

class PostTagRel < ApplicationRecord
  belongs_to :post
  belongs_to :tag
end
