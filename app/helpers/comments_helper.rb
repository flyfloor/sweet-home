module CommentsHelper
	def owner_comment comment
		if current_user
			comment[:email] = current_user.email
			comment[:website] = current_user.website
			comment[:commenter] = current_user.username
		end
		return comment
	end

end
