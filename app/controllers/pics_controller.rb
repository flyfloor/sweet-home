class PicsController < ApplicationController
	include AdminHelper
	before_filter :sign_in_user, only: [:new, :edit, :update]
	
	def index
		
	end

	def new
	end

	def edit
		
	end

	def create
		
	end

	def update
		
	end

	def destroy
		
	end


end
