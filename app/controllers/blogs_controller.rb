class BlogsController < ApplicationController
	include AdminHelper
	before_filter :sign_in_user, only: [:new, :edit, :update]
	def index
		@blogs = Blog.paginate(page: params[:page], per_page:5).order("created_at DESC")
		respond_to do |format|
			format.html
			format.json { render json: @blogs }
		end
	end

	def new
		@blog = Blog.new
		respond_to do |format|
			format.html
			format.json { render @blog }
		end
	end

	def create
		@blog = Blog.new(params[:blog])
		@blog.like_count = 0
		@tags = params[:tags].split('#tag#');

		for tag in @tags do
			@exist_tag = Tag.where("name = ?", tag.to_s);
			if @exist_tag.blank?
				@blog.tags.create(name: tag.to_s)
			else
				@blog.tags << @exist_tag
			end
		end		

		respond_to do |format|
			if @blog.save
				format.html { redirect_to @blog }
				format.json { render json: @blog }
			else
				format.html { render 'new' }
				format.json
			end
		end
	end

	def show
		@blog = Blog.find(params[:id])
		render status:404 unless @blog
	end

	def edit
		@blog = Blog.find(params[:id])
	end

	def update
		@blog = Blog.find(params[:id])
		respond_to do |format|
			if @blog.update_attributes(params[:blog])
				format.html { redirect_to @blog }
				format.json { render json: @blog }
			else
				format.html { render 'edit' }
				format.json
			end
		end
	end

	def destroy
		@blog = Blog.find(params[:id])
		@blog.destroy	
		respond_to do |format|
			format.json	{render json:{delete: "ok"}}	
		end
	end



	def like
		@blog = Blog.find(params[:id])
		@blog.like_count += 1
		if @blog.save
			respond_to do |format|
				format.json {render json: @blog.like_count}
			end
		end			
	end

end
