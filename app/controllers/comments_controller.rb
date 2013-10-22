class CommentsController < ApplicationController
	def create
		@blog = Blog.find(params[:blog_id])
		@comment = @blog.comments.build(params[:comment])
		respond_to do |format|
			if @comment.save
				format.html { redirect_to @comment }
				format.json { render json: @comment }
			else
				format.html { render 'new' }
				format.json
			end
		end
	end

	def destroy
		@blog = Blog.find(params[:blog_id])
		@comment = @blog.comments.find(params[:id])
		@comment.destroy
		respond_to do |format|
			format.json	{render json:{delete: "ok"}}	
		end
	end
end
