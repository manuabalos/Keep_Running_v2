class RoutesController < ApplicationController

	def index
		@routes = Route.all

		respond_to do |format|
			format.html #index.html.erb
	      	format.json { render json: {:route => @routes } }
		end
	end

	def show
		@route = Route.find(params[:id])
		@waypoints = @route.waypoints

		respond_to do |format|
      		format.html # show.html.erb
      		format.json { render json: {:route => @route, :waypoints => @waypoints} }
   		end
	end

	def filter
		@routes = Route.where("difficulty = ?", params[:difficulty])
	
		respond_to do |format|
			format.html #index.html.erb
	      	format.json { render json: {:route => @routes } }
		end
	end
	
end
