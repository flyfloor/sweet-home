module ApplicationHelper
  require "digest/md5"
  require 'kramdown'

  def title page_title
    return base_title if page_title.blank?
    page_title
  end

  def html_view text
    Kramdown::Document.new(text).to_html.gsub("\n", "\r") unless text.blank?
  end

  def updated_time target
    target.updated_at.localtime.to_s(:db) unless target.nil?
  end

  def split_tag(object, tags)
    object.tags = []
    tags.each do |tag|
      object.tags << exist_tag(tag.to_s)
    end
  end

  def make_tag thing
    split_tag(thing, params[:tags].split('#tag#'))
  end

  def base_title
    "Lacuna's Blog"
  end

  def exist_tag tag
    @tag = Tag.where("name = ?", tag)
    return new_tag(tag) if @tag.blank?
    @tag
  end

  def new_tag tag
    Tag.new(name: tag)
  end

  def has_pre?
    
  end

end
