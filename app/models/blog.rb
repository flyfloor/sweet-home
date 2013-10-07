class Blog < ActiveRecord::Base
	has_and_belongs_to_many :tags
	has_many :comments, dependent: :destroy
	validates :title, presence: true
  attr_accessible :content, :title, :tags
end
