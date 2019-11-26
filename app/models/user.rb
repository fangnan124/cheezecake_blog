# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  provider               :string           default("email"), not null
#  uid                    :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  allow_password_change  :boolean          default(FALSE)
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  name                   :string
#  nickname               :string
#  image                  :string
#  email                  :string
#  tokens                 :json
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role                   :string
#

require 'letter_avatar/has_avatar'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  include LetterAvatar::HasAvatar

  enum role: {
    writer: 'writer',
    reader: 'reader'
  }, _suffix: :user

  attr_accessor :invitation_code

  validates :name, presence: true
  # validates :invitation_code, presence: true, on: :create
  # validate :valid_invitation_code?, on: :create
  #
  # def valid_invitation_code?
  #   invitation_request = InvitationRequest.find_by(email: email)
  #
  #   if invitation_request
  #     errors.add(:invitation_code, 'invalid code') if invitation_request.code != invitation_code
  #   else
  #     errors.add(:email, 'not requested')
  #   end
  # end

  before_create do
    self.role = :reader
  end
end
