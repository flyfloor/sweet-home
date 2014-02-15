class CommentsController < ApplicationController
	include AdminHelper, CommentsHelper
	before_filter :sign_in_user, only: :destroy

	def create
		@comment = Comment.new
		if signed_in?
			author_comment @comment
			@comment[:content] = params[:comment][:content]
		else
			@comment = Comment.new(params[:comment])
		end

		thing.comments << @comment
		redirect_to thing
	end

	def destroy
		@comment = thing.comments.find params[:id]
		if @comment.destroy
			render json:{success: true}
		end
	end

	private

		def find_blog
			find_model(Blog, blog_id)
		end

		def find_picture
			find_model(Picture, picture_id)
		end

		def find_model(model, value)
			@thing = model.find value
		end

		def thing
			if is_blog?
				@thing = find_blog
			elsif is_picture?
				@thing = find_picture
			end
		end


		def is_blog?
			blog_id.present?
		end

		def is_picture?
			!picture_id.present?
		end
		
		def blog_id
			params[:blog_id]
		end

		def picture_id
			params[:picture_id]
		end


end
