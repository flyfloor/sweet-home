class Picture < ActiveRecord::Base
	has_and_belongs_to_many :tags
  attr_accessible :description, :avatar
  has_many :comments, dependent: :destroy
  
  mount_uploader :avatar, AvatarUploader
  before_save :default_values


  def default_values
  	self.like_count ||= 0
  end
end
