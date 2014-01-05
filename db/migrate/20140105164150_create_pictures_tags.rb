class CreatePicturesTags < ActiveRecord::Migration
  create_table :pictures_tags do |t|
  	t.belongs_to :picture
  	t.belongs_to :tag
  end
end
