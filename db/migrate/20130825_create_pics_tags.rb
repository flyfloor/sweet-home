class CreatePicsTags < ActiveRecord::Migration
  def change
  	create_table :pics_tags do |t|
  		t.belongs_to :picture
  		t.belongs_to :tag
  	end
  end
end