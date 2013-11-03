class ChangeColumnToComments < ActiveRecord::Migration
  def up
  	remove_column :comments, :commenter
  	remove_column :comments, :email
  end

end
