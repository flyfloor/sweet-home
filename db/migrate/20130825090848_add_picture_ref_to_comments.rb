class AddPictureRefToComments < ActiveRecord::Migration
  def change
    add_column :comments, :picture_id, :integer
    add_index :comments, :picture_id
  end
end
