require 'rails_helper'

RSpec.describe "invitation_requests/edit", type: :view do
  before(:each) do
    @invitation_request = assign(:invitation_request, InvitationRequest.create!(
      :email => "MyString",
      :message => "MyText",
      :code => "MyString",
      :status => "MyString",
      :user_id => 1
    ))
  end

  it "renders the edit invitation_request form" do
    render

    assert_select "form[action=?][method=?]", invitation_request_path(@invitation_request), "post" do

      assert_select "input[name=?]", "invitation_request[email]"

      assert_select "textarea[name=?]", "invitation_request[message]"

      assert_select "input[name=?]", "invitation_request[code]"

      assert_select "input[name=?]", "invitation_request[status]"

      assert_select "input[name=?]", "invitation_request[user_id]"
    end
  end
end
