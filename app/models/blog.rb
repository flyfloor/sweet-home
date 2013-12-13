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

  def html_view
    self.content = Kramdown::Document.new(self.content).to_html
  end
end
