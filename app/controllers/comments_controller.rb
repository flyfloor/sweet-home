class CommentsController < ApplicationController
	include AdminHelper, CommentsHelper
	before_filter :sign_in_user, only: :destroy
	before_filter :find_blog, only: [:create, :destroy]

	def create
		@comment = @blog.comments.create params[:comment]
		redirect_to blog_path(@blog)
	end

	def destroy
		@comment = @blog.comments.find params[:id]
		@comment.destroy
		respond_to do |format|
			format.json	{render json:{delete: "ok"}}	
		end
	end

	def find_blog
		@blog = Blog.find params[:blog_id]
	end

end
