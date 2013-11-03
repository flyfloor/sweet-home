class AddGravatarToComments < ActiveRecord::Migration
  def change
  	add_column :comments, :gravatar, :string
  end
end
