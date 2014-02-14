class BlogsController < ApplicationController
	include ApplicationHelper, AdminHelper
	before_filter :sign_in_user, except: [:index, :show, :like]
	before_filter :find_blog, only: [:show, :edit, :update, :destroy, :like]
	caches_page :show

	def index
		@blogs = Blog.paginate(page: params[:page], per_page:5).order("created_at DESC")
	end

	def new
		@blog = Blog.new
	end

	def create
		@blog = Blog.new params[:blog]
		label_tag @blog

		if @blog.save
			redirect_to @blog
		else
			render 'new'
		end
	end

	def show
		render status:404 unless @blog
	end


	def update
		expire_page action: :show
		label_tag @blog

		if @blog.update_attributes params[:blog]
			redirect_to @blog
		end
	end

	def destroy
		if @blog.destroy
			render json:{success: true}
		else
			render json:{success: false}
		end
	end



	def like
		@blog.like_count += 1
		if @blog.save
			render json: @blog.like_count
		end	
	end

	def find_blog
		@blog = Blog.find params[:id]
	end

end
