class CommentsController < ApplicationController
	include AdminHelper, CommentsHelper
	before_filter :sign_in_user, only: :destroy
	before_filter :find_blog, only: [:create, :destroy]

	def create
		# binding.pry
		@comment = Comment.new
		if signed_in?
			author_comment @comment
			@comment[:content] = params[:comment][:content]
		else
			@comment = Comment.new(params[:comment])
		end
		@blog.comments << @comment
		redirect_to blog_path(@blog)
	end

	def destroy
		@comment = @blog.comments.find params[:id]
		if @comment.destroy
			render json:{success: true}
		end
	end

	def find_blog
		@blog = Blog.find params[:blog_id]
	end

end
