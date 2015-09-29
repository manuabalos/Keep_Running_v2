# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Route.create(   name: "Parque del Retiro", 
				description: "La mejor de las opciones para cualquier perfil de corredor, ya que el terreno es de grava y tierra (también es posible correr sobre asfalto) y la larga longitud de una vuelta completa permite recorrer grandes distancias sin repetir demasiado el mismo recorrido.",
			  	location: "Madrid", 
			  	difficulty: "Intermedia", 
			  	distance: 4.5,
			  	latitude: 40.415788, 
			  	longitude: -3.682461)

Route.create( 	name: "Parque del Canal", 
				description: "Si quieres empezar a correr y no quieres marcharte muy lejos, este es tu mejor campo de entrenamiento. La vuelta completa a las instalaciones del Canal de Isabel II en Chamberí es un paseo agradable que cualquier persona puede cumplir a trote suave.",
				location: "Madrid", 
				difficulty: "Principiante", 
				distance: 4,
				latitude: 40.443223, 
				longitude: -3.707657)

Route.create( 	name: "Templo de Debod", 
				description: "Otro de los lugares perfectos para los que quieren empezar en el mundo del running o para los más experimentados que solo quieren hacer un entrenamiento corto por un lugar agradable y con buenas vistas.",
			  	location: "Madrid", 
			  	difficulty: "Principiante", 
			  	distance: 5,
			  	latitude: 40.432529, 
			  	longitude: -3.725233)

Route.create( 	name: "Parque del Oeste", 
				description: "La ruta propuesta combina asfalto con tierra y asegura subidas y bajadas en numerosos tramos, además de un paso sobre el puente que cruza las vías que dan a Príncipe Pío.",
			  	location: "Madrid", 
			  	difficulty: "Intermedia", 
			  	distance: 4.3,
			  	latitude: 40.434997, 
			  	longitude: -3.719869)

Route.create( 	name: "Casa de Campo", 
				description: "La ruta propuesta combina asfalto con tierra y asegura subidas y bajadas en numerosos tramos, además de un paso sobre el puente que cruza las vías que dan a Príncipe Pío.",
			  	location: "Madrid", 
			  	difficulty: "Dificil", 
			  	distance: 12,
			  	latitude: 40.417482, 
			  	longitude: -3.734769)