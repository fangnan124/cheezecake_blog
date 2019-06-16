require 'rails_helper'

RSpec.describe "invitation_requests/index", type: :view do
  before(:each) do
    assign(:invitation_requests, [
      InvitationRequest.create!(
        :email => "Email",
        :message => "MyText",
        :code => "Code",
        :status => "Status",
        :user_id => 2
      ),
      InvitationRequest.create!(
        :email => "Email",
        :message => "MyText",
        :code => "Code",
        :status => "Status",
        :user_id => 2
      )
    ])
  end

  it "renders a list of invitation_requests" do
    render
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Code".to_s, :count => 2
    assert_select "tr>td", :text => "Status".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
