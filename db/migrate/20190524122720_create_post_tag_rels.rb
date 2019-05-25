class CreatePostTagRels < ActiveRecord::Migration[5.2]
  def change
    create_table :post_tag_rels do |t|
      t.integer :post_id
      t.integer :tag_id
    end
  end
end
