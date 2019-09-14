class CreatePostRevisions < ActiveRecord::Migration[5.2]
  def change
    create_table :post_revisions do |t|
      t.string :revision_number
      t.string :title
      t.text :content
      t.integer :post_id

      t.timestamps
    end
  end
end
