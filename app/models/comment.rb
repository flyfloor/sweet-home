class Comment < ActiveRecord::Base
  belongs_to :blog
  belongs_to :picture
  attr_accessible :commenter, :content
end
