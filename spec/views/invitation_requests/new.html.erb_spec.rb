require 'rails_helper'

RSpec.describe "invitation_requests/new", type: :view do
  before(:each) do
    assign(:invitation_request, InvitationRequest.new(
      :email => "MyString",
      :message => "MyText",
      :code => "MyString",
      :status => "MyString",
      :user_id => 1
    ))
  end

  it "renders new invitation_request form" do
    render

    assert_select "form[action=?][method=?]", invitation_requests_path, "post" do

      assert_select "input[name=?]", "invitation_request[email]"

      assert_select "textarea[name=?]", "invitation_request[message]"

      assert_select "input[name=?]", "invitation_request[code]"

      assert_select "input[name=?]", "invitation_request[status]"

      assert_select "input[name=?]", "invitation_request[user_id]"
    end
  end
end
