module ApplicationHelper
  require "digest/md5"

  def title page_title
    base_title = "Lacuna's_Blog"
    if page_title.empty?
      base_title
    else
      page_title
    end
  end

  def html_view text
    text = Kramdown::Document.new(text).to_html.gsub("\n", "\r")
  end

  def updated_time target
    target.updated_at.localtime.to_s(:db) unless target.blank?
  end

  def gravatar email
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest email.strip.downcase}"
  end

end
