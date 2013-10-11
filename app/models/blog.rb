class Blog < ActiveRecord::Base
	has_and_belongs_to_many :tags
	has_many :comments, dependent: :destroy
	validates :title, presence: true
  attr_accessible :content, :title, :tags

  def has_pre?
  	Blog.first != self
  end

  def pre_blog
  	Blog.where("id < ?", self).order("id DESC").first
  end

  def has_next?
  	Blog.last != self
  end

  def next_blog
  	Blog.where("id > ?", self).order("id ASC").first
  end
end
