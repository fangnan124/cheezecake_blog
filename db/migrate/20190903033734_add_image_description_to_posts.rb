class AddImageDescriptionToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :image_description, :text
  end
end
