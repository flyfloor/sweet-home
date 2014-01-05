class RemoveColumnFromPictures < ActiveRecord::Migration
  def up
  	remove_attachment :pictures, :avatar
  end

  def down
  end
end
