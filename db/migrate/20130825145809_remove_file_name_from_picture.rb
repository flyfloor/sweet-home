class RemoveFileNameFromPicture < ActiveRecord::Migration
  def change
    remove_column :pictures, :filename
  end
end
