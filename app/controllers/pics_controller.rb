class PicsController < ApplicationController
	include AdminHelper
	before_filter :sign_in_user, only: [:new, :edit, :update]
	
	def index
		@pics = Picture.paginate(page: params[:page], per_page:5).order("created_at DESC")
	end

	def new
		@pic = Picture.new
	end

	def edit
		
	end

	def create
		@pic = Picture.create params[:picture]
		if @pic.save
			redirect_to pic_path(@pic)
		else
			render 'new'
		end
	end

	def show
		# binding.pry
		@pic = Picture.find(params[:id])
	end

	def update
		
	end

	def destroy
		
	end


end
