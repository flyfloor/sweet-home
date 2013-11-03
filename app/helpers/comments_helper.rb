module CommentsHelper
	require "digest/md5"

	def gravatar(email)
		gravatar_id = Digest::MD5.hexdigest(email.downcase)
		"http://www.gravatar.com/avatar/#{gravatar_id}"
	end
end
