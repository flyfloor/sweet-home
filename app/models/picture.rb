class Picture < ActiveRecord::Base
	has_and_belongs_to_many :tags
  attr_accessible :description, :filename, :title
  has_many :comments, dependent: :destroy

  attr_accessible :avatar
  has_attached_file :avatar :default_url => "/uploads/images/missing.png"
end
