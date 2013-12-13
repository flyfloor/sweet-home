module CommentsHelper
	require "digest/md5"

	def gravatar email
		"http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest email.strip.downcase}"
	end

end
