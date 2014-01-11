class AddlikesToPictures < ActiveRecord::Migration
  def up
  	add_column :pictures, :like_count, :integer
  end

  def down
  end
end
