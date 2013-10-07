class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :title
      t.string :filename
      t.text :description

      t.timestamps
    end
  end
end
