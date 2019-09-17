# == Schema Information
#
# Table name: invitation_requests
#
#  id         :bigint           not null, primary key
#  email      :string
#  message    :text
#  code       :string
#  status     :string(20)       default("pending")
#  expire_at  :date
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :invitation_request do
    email { "MyString" }
    message { "MyText" }
    code { "MyString" }
    status { "MyString" }
    expire_at { "2019-06-15" }
    user_id { 1 }
  end
end
