require 'rails_helper'

RSpec.describe "invitation_requests/show", type: :view do
  before(:each) do
    @invitation_request = assign(:invitation_request, InvitationRequest.create!(
      :email => "Email",
      :message => "MyText",
      :code => "Code",
      :status => "Status",
      :user_id => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/Code/)
    expect(rendered).to match(/Status/)
    expect(rendered).to match(/2/)
  end
end
