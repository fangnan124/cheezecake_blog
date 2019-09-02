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

FactoryBot.define do
  factory :post do
    title { "How to be better?" }
    content { "It's a mystery, but at the same time it's interesting." }
  end
end
