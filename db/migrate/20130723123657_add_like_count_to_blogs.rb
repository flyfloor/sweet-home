class AddLikeCountToBlogs < ActiveRecord::Migration
  def change
  	add_column :blogs, :like_count, :integer
  end
end
