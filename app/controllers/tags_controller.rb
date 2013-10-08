class TagsController < ApplicationController
	def index
		@tags = Tag.all
	end
	
	# def create
	# 	@blog = Blog.find(params[:blog_id])
	# 	@tag = @blog.tags.create(params[:tag])
	# 	redirect_to blog_path(@blog)
	# end


	def show
		@tag = Tag.find(params[:id])
		@blogs = @tag.blogs
	end
end
