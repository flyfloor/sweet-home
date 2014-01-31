class ApplicationController < ActionController::Base
  protect_from_forgery

  def upload
		# binding.pry
		upload_io = params[:pic]
		content_type = "application/json"
		if is_image? upload_io.content_type 
			filePath = root_url + "imgs/uploads/"+upload_io.original_filename
			File.open(Rails.root.join('public/imgs', 'uploads', upload_io.original_filename), 'w:UTF-8') do |file|  
	    	file.write(upload_io.read.force_encoding("utf-8"))
	  	end
			render text: {"success"=> true, "filePath"=>filePath}.to_json
		else
			render text: {"success"=> false}.to_json
		end
	end

	private
		def rename name
			if !filename.blank?
				# require 'uuidools'
				# filename.sub()
			end
		end

		def is_image? type
			image_type = ["image/jpeg", "image/png", "image/gif"]
			if type.blank?
				false
			else
				image_type.include? type
			end
		end

		def write_file filename
			File.open(Rails.root.join('public/imgs', 'uploads', filename), 'w:UTF-8') do |file|  
	    	file.write(upload_io.read.force_encoding("utf-8"))
	  	end
		end
end
