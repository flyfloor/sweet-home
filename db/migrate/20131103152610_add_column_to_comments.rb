class AddColumnToComments < ActiveRecord::Migration
  def change
  	add_column :comments, :commenter, :string, :null => false
  	add_column :comments, :email, :string, :null => false
  end
end
