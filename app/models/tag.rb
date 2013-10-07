class Tag < ActiveRecord::Base
  has_and_belongs_to_many :blogs
  has_and_belongs_to_many :pictures
  attr_accessible :name
end
