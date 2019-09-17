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

require 'rails_helper'

RSpec.describe InvitationRequest, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
