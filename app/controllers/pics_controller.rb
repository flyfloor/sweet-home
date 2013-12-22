class PicsController < ApplicationController
	include AdminHelper
	before_filter :sign_in_user, only: [:new, :edit, :update]
	
	def index
		
	end

	def new
		@pic = Picture.new
		respond_to do |format|
			format.html
			format.json {render @pic}
		end
	end

	def edit
		
	end

	def create
		
	end

	def update
		
	end

	def destroy
		
	end

	def upload
		# binding.pry
		image_type = ["image/jpeg", "image/png", "image/gif"]
		upload_io = params[:pic]
		content_type = "application/json";
		if image_type.include?(upload_io.content_type) 
			filePath = "http://localhost:3000/imgs/uploads/"+upload_io.original_filename
			File.open(Rails.root.join('public/imgs', 'uploads', upload_io.original_filename), 'w:UTF-8') do |file|  
	    	file.write(upload_io.read.force_encoding("utf-8"))
	  	end
			render text: {"success"=> true, "filePath"=>filePath}.to_json
		else
			render text: {"success"=> false}.to_json
		end
	end

	private
		def get_file_name filename
			if !filename.blank?
				# require 'uuidools'
				# filename.sub()
			end
		end

end
