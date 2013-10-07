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

	def upload_picture
		
	end

end
