class Blog < ActiveRecord::Base
  require 'kramdown'
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

  def label_tag tags
    tags.each do |tag|
      @exist_tag = Tag.where("name = ?", tag.to_s)
      if @exist_tag.blank?
        self.tags << Tag.new(name: tag.to_s)
      else
        self.tags << @exist_tag        
      end
    end
  end
end
