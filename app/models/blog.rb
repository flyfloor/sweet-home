class Blog < ActiveRecord::Base
	has_and_belongs_to_many :tags
	has_many :comments, dependent: :delete_all
	validates :title, presence: true
  attr_accessible :content, :title, :tags
  before_save :default_values

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

  def default_values
    self.like_count ||= 0
  end

  def self.recent_blogs(index = 3)
    Blog.order("id DESC").limit(index)
  end

  def bref_content(range = 1000)
    self.content.instance_eval do |text|
      return text.to_s.strip[0, range] if text.length > range
      text.to_s
    end
  end
      
end
