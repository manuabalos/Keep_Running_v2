# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Route.create(   name: "Parque del Retiro", 
				description: "Recorrido por la zona exterior del parque del Retiro.",
			  	location: "Madrid", 
			  	difficulty: "Intermedia", 
			  	distance: 5,
			  	latitude: 40.416100, 
			  	longitude: -3.684284)

Route.create( 	name: "Parque del Canal", 
				description: "Recorrido por la zona exterior del parque del Canal.",
				location: "Madrid", 
				difficulty: "Principiantes", 
				distance: 4,
				latitude: 40.443223, 
				longitude: -3.707657)

Route.create( 	name: "Templo de Debod", 
				description: "Recorrido por la zona del paseo Pintor Rosales y el templo de Debod.",
			  	location: "Madrid", 
			  	difficulty: "Principiantes", 
			  	distance: 5,
			  	latitude: 40.432529, 
			  	longitude: -3.725233)