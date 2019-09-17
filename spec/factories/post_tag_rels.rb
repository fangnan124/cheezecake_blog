# == Schema Information
#
# Table name: post_tag_rels
#
#  id      :bigint           not null, primary key
#  post_id :integer
#  tag_id  :integer
#

FactoryBot.define do
  factory :post_tag_rel do
    post_id { 1 }
    tag_id { 1 }
  end
end
