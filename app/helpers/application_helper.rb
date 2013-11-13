module ApplicationHelper

  def title page_title
  	base_title = "Lacuna's_Blog"
  	if page_title.empty?
  		base_title
  	else
  		page_title
  	end
  end
  
end
