module ApplicationHelper
  require "digest/md5"
  require 'kramdown'

  def title page_title
    return base_title unless page_title.present?
    page_title
  end

  def base_title
    "Lacuna's Blog"
  end

  def html_view text
    Kramdown::Document.new(text).to_html.gsub("\n", "\r") if text.present?
  end

  def updated_time target
    target.updated_at.localtime.to_s(:db) unless target.nil?
  end

  def label_tag(thing, tags = params[:tags].split('#tag#'))
    thing.tags = []
    tags.each do |tag|
      thing.tags << process_tag(tag.to_s)
    end
  end


  def process_tag tag
    @tag = Tag.where("name = ?", tag)
    return Tag.new(name: tag) unless @tag.present?
    @tag
  end

end
