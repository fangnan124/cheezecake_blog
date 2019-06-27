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
