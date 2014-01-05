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
		make_tag @blog

		respond_to do |format|
			if @blog.save
				format.html { redirect_to @blog }
			else
				format.html { render 'new' }
			end
		end
	end

	def show
		render status:404 unless @blog
	end


	def update
		expire_page action: :show
		@blog.tags = []
		make_tag

		respond_to do |format|
			if @blog.update_attributes params[:blog]
				format.html { redirect_to @blog }
			end
		end
	end

	def destroy
		@blog.destroy	
		respond_to do |format|
			format.json	{render json:{delete: "ok"}}	
		end
	end



	def like
		@blog.like_count += 1
		if @blog.save
			respond_to do |format|
				format.json {render json: @blog.like_count}
			end
		end			
	end

	def find_blog
		@blog = Blog.find params[:id]
	end

end
