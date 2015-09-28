class RoutesController < ApplicationController

	def index
		@routes = Route.all

		respond_to do |format|
			format.html 
	      	format.json { render json: {:route => @routes } }
		end
	end
	
end
