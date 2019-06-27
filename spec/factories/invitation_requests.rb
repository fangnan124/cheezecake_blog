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
