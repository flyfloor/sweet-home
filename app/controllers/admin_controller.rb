class AdminController < ApplicationController
	include AdminHelper

	def new
		if signed_in?
			redirect_to blogs_path
		end
	end

	def create
		user = User.find_by_email(params[:admin][:email].downcase)
		if user && User.authenticate(user.password, params[:admin][:password]) 
			sign_in(user)
			redirect_to blogs_path
		else
			render 'new'
		end
	end

	def destroy
		sign_out
		redirect_to blogs_path
	end

end
