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

class InvitationRequest < ApplicationRecord
  enum status: {
    approved: 'approved',
    pending: 'pending',
    expired: 'expired',
    signed: 'signed',
    declined: 'declined'
  }

  def generate_or_renew_code
    self.code = SecureRandom.alphanumeric(6).upcase
    self.expire_at = Time.zone.today + 1.month
  end
end
