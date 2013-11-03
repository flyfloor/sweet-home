class Comment < ActiveRecord::Base
  belongs_to :blog
  belongs_to :picture
  validates :commenter, presence: true
  attr_accessible :commenter, :content, :email, :website
end
