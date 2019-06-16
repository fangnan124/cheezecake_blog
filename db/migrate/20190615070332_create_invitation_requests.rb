class CreateInvitationRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :invitation_requests do |t|
      t.string  :email
      t.text    :message
      t.string  :code
      t.string  :status, limit: 20, default: 'pending'
      t.date    :expire_at
      t.integer :user_id

      t.timestamps
    end
  end
end
