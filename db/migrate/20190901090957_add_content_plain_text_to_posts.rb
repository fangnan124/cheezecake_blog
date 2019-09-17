class AddContentPlainTextToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :content_plain_text, :text
  end
end
