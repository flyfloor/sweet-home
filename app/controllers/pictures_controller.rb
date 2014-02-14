class PicturesController < ApplicationController
	include ApplicationHelper, AdminHelper
	before_filter :find_picture, only: [:show, :edit, :update, :destroy, :like]
	before_filter :sign_in_user, except: [:index, :show, :like]
	
	def index
		@pics = Picture.paginate(page: params[:page], per_page:10).order("created_at DESC")
	end

	def new
		@pic = Picture.new
	end

	def edit
		
	end

	def create
		@pic = Picture.new params[:picture]
		label_tag @pic

		if @pic.save
			redirect_to picture_path(@pic)
		else
			render 'new'
		end
	end

	def show
		respond_to do |format|
			format.html
			format.json { render json: @pic.avatar }
		end
	end

	def update
		label_tag @pic
		###
	end

	def destroy
		
	end

	def like
		@pic.like_count += 1
		if @pic.save
			render json: @pic.like_count
		end
	end

	def find_picture
		@pic = Picture.find params[:id]
	end

end
