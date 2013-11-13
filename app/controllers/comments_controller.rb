class CommentsController < ApplicationController
	include AdminHelper, CommentsHelper
	before_filter :sign_in_user, only: :destroy
	before_filter :find_blog, only: [:create, :destroy]

	def create
		@comment = @blog.comments.build params[:comment]
		@comment.gravatar = gravatar params[:comment][:email]
		respond_to do |format|
			if @comment.save
				format.html { redirect_to @comment }
				format.json { render json: @comment }
			else
				format.html { render 'new' }
				format.json { render json:{status:"false"}}
			end
		end
	end

	def destroy
		@comment = @blog.comments.find params[:id]
		@comment.destroy
		respond_to do |format|
			format.json	{render json:{delete: "ok"}}	
		end
	end

	def find_blog
		@blog = Blog.find(params[:blog_id])
	end

end
