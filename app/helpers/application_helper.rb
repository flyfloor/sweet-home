module ApplicationHelper
  require "digest/md5"
  require 'kramdown'

  def title page_title
    base_title = "Lacuna's_Blog"
    if page_title.blank?
      base_title
    else
      page_title
    end
  end

  def html_view text
    text = Kramdown::Document.new(text).to_html.gsub("\n", "\r") unless text.blank?
  end

  def updated_time target
    target.updated_at.localtime.to_s(:db) unless target.blank?
  end

  def split_tag(object, tags)
    tags.each do |tag|
      @exist_tag = Tag.where("name = ?", tag.to_s)
      if @exist_tag.blank?
        object.tags << Tag.new(name: tag.to_s)
      else
        object.tags << @exist_tag        
      end
    end
  end

  def make_tag object
    split_tag(object, params[:tags].split('#tag#'))
  end

end
