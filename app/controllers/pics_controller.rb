class PicsController < ApplicationController
	include ApplicationHelper, AdminHelper
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
		make_tag

		if @pic.save
			redirect_to pic_path(@pic)
		else
			render 'new'
		end
	end

	def show
		@pic = Picture.find(params[:id])
	end

	def update
		
	end

	def destroy
		
	end

	private
		def make_tag
			split_tag(@pic, params[:tags].split('#tag#'))
		end


end
