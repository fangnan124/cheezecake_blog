# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

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
