class AddStatusToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :status, :string, limit: 20, default: 'wip'
  end
end
