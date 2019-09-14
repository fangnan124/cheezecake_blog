FactoryBot.define do
  factory :post_revision do
    revision_number { "MyString" }
    title { "MyString" }
    content { "MyText" }
    post_id { 1 }
  end
end
