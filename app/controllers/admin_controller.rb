class AdminController < ApplicationController
	include AdminHelper

	def new
		if signed_in?
			redirect_to blogs_path
		end
	end

	def create
		if !request_user.nil? && authenticate(request_user)
			sign_in request_user
			redirect_to blogs_path
		else
			render 'new'
		end
	end

	def destroy
		sign_out
		redirect_to blogs_path
	end

	private
		def request_user
			@user = User.find_by_email params[:admin][:email].downcase
		end


		def authenticate user
			User.authenticate(user.password, params[:admin][:password])
		end


end
