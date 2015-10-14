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

=begin		@geojson = Array.new
		
		@waypoints.each do |waypoint|
		  @geojson << {
		    type: 'Feature',
		    geometry: {
		      type: 'Point',
		      coordinates: [waypoint.longitude, waypoint.latitude]
		    }
		  }
		end

		respond_to do |format|
		  format.html
		  format.json { render json: @geojson }  # respond with the created JSON object
		end
=end
		respond_to do |format|
      		format.html # show.html.erb
      		format.json { render json: {:route => @route, :waypoints => @waypoints} }
   		end

	end

=begin	def filterDifficulty 
		@routes = Route.filterDifficulty(params[:difficulty])
	    render json: {:route => @routes }
	end
=end	
end
