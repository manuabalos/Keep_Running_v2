$(document).ready(function(){

   	this_url = window.location.href;
   	L.mapbox.accessToken = 'pk.eyJ1IjoibWFudWFiYWxvcyIsImEiOiJjaWYzdzcyZ3cwMGwwdGZseWVma2IxeXM5In0.oiCfQ9C3Yf7IQJecd3auZg';

   	$(".routes.index").ready(function() {

   		var rutas = $.ajax({
	    	type: 'GET',
	        dataType: 'json',
	        url: this_url,
	        success: function(data) { drawMap(data); },
	        error: function(data) { console.log("Error ",data); }
		});

				
   		function drawMap(data){
			var map = L.mapbox.map('map', 'mapbox.streets').setView([40.087802, -3.873294], 6)
						.addControl(L.mapbox.geocoderControl('mapbox.places', {
					        autocomplete: true
					    }));
			L.control.fullscreen().addTo(map);	// Opción de pantalla completa
			L.control.locate().addTo(map); // Localizador de posición				
			var myLayer = L.mapbox.featureLayer().addTo(map);

			// This uses the HTML5 geolocation API, which is available on
			// most mobile browsers and modern browsers, but not in Internet Explorer
			//
			// See this chart of compatibility for details:
			// http://caniuse.com/#feat=geolocation
			var geolocate = document.getElementById('geolocate');
			if (!navigator.geolocation) {
			    geolocate.innerHTML = 'Geolocation is not available';
			} else {
			    geolocate.onclick = function (e) {
			        e.preventDefault();
			        e.stopPropagation();
			        map.locate();
			    };
			}

			// Once we've got a position, zoom and center the map
			// on it, and add a single marker.
			map.on('locationfound', function(e) {
			    map.fitBounds(e.bounds);

			    myLayer.setGeoJSON({
			        type: 'Feature',
			        geometry: {
			            type: 'Point',
			            coordinates: [e.latlng.lng, e.latlng.lat]
			        },
			        properties: {
			            'title': '¡Aqui estas tú!',
			            'marker-color': '#ff8888',
			            'marker-symbol': 'star'
			        }
			    });

			});

			// If the user chooses not to allow their location
			// to be shared, display an error message.
			map.on('locationerror', function() {
			    geolocate.innerHTML = 'Position could not be found';
			});

			// When a user selects a marker, center the map on its coordinates.
			map.featureLayer.on('click', function(e) {
	        	map.panTo(e.layer.getLatLng());
	   		});


			// Añadimos los marcadores donde se encuentran las rutas
			for(i=0;i<data.route.length;i++){

				switch(data.route[i].difficulty) {
				    case "Principiante":
				        colorIconDifficulty = "#00ff00";
				        break;
				    case "Intermedia":
				        colorIconDifficulty = "#009933";
				        break;
				    case "Dificil":
				    	colorIconDifficulty = "#ff0000";
				    	break;
				}

				L.mapbox.featureLayer({
					
					    // this feature is in the GeoJSON format: see geojson.org
					    // for the full specification
					    type: 'Feature',
					    geometry: {
					        type: 'Point',
					        // coordinates here are in longitude, latitude order because
					        // x, y is the standard for GeoJSON and many formats
					        coordinates: [
					          data.route[i].longitude,
					          data.route[i].latitude 
					        ]
					    },
					    properties: {
					        title: data.route[i].name,
					        description: data.route[i].description+"<ul><li><b>Dificultad:</b> "+data.route[i].difficulty+"</li><li><b>Distancia total:</b> "+data.route[i].distance+" km.</li></ul><a href='"+this_url+"/"+data.route[i].id+"' id='btn-ver-ruta' class='btn btn-default btn-mapbox-default'>Ver ruta</a>",
					        url: this_url+data.route[i].id,
					        // one can customize markers by adding simplestyle properties
					        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
					        'marker-size': 'large',
					        'marker-color': colorIconDifficulty,
					        'marker-symbol': 'pitch'
					    }

				}).addTo(map);
			}					
		}

		// Mostrar en formato tabla
		$(".btn-mostrar-tabla").on("click", function(){
			// Borramos el mapa
			$(".rutas-index").empty();
			console.log(rutas.responseJSON.route);

			//Añadimos la tabla
			var tablaRutasIndex = "<div class='table-responsive'><table class='table'><thead><tr class='tabla-cabecera-index'><th>Ruta</th><th>Dificultad</th><th>Distancia (km.)</th><th>Lugar</th></tr></thead><tbody class='rutas-index-fila'></tbody></table></div>";
			$(".rutas-index").append(tablaRutasIndex);

				for(i=0;i<rutas.responseJSON.route.length;i++){
					// Añadimos el contenido de cada fila
					var rutaNombre = "<tr class='tabla-fila-index' data-href=/routes/"+rutas.responseJSON.route[i].id+"><td><b>"+rutas.responseJSON.route[i].name+"</b></td>"; 
					var rutaDificultad = "<td>"+rutas.responseJSON.route[i].difficulty+"</td>";
					var rutaDistancia = "<td>"+rutas.responseJSON.route[i].distance+"</td>";
					var rutaLugar = "<td>"+rutas.responseJSON.route[i].location+"</td></tr>";

					var filaRuta = rutaNombre+rutaDificultad+rutaDistancia+rutaLugar;

					$(".rutas-index-fila").append(filaRuta);
					$(".rutas-index-fila").css("text-align","center");

					$(".tabla-fila-index").css("background-color","white");
					$(".tabla-fila-index").css("cursor","pointer");
				}

			$(".tabla-fila-index").on("click", function() {
	    		window.document.location = $(this).data("href");
			});

		});

		//Mostrar en formato mapa
		$(".btn-mostrar-mapa").on("click", function(){
			// Borramos la tabla
			$(".rutas-index").empty();
			//Añadimos el contenedor del mapa
			$(".rutas-index").append("<div id='map'></div>");
			drawMap(rutas.responseJSON);			
		});	
   	});

// Testeando MapBox
// Objetivo: Mostrar la ruta exacta de cada recorrido
// Problema : Mapbox aun no tiene implementada la funcionalidad de dibujar una ruta usando distintos
// puntos de coordenadas.
	$(".routes.show").ready(function() {
  		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: this_url,
	        success: function(data) { takingRoute(data); }
	   	});    	


	   function takingRoute(data){
	   	console.log(data);

	   		var map = L.mapbox.map('map', 'mapbox.streets').setView([data.route.latitude, data.route.longitude], 15);
   			var directions = L.mapbox.directions({
		    	profile: 'mapbox.walking',
			});
   			totalWaypoints = parseInt(data.waypoints.length);
   			console.log(totalWaypoints);
   			directions.setOrigin(L.latLng(data.waypoints[0].latitude, data.waypoints[0].longitude));
			directions.setDestination(L.latLng(data.waypoints[7].latitude, data.waypoints[7].longitude));

			for(i=0;i<data.waypoints.length;i++){
				directions.addWaypoint(i, L.latLng(data.waypoints[i].latitude,data.waypoints[i].longitude));
			}
			
			directions.query();

			var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
		    var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
		    var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions).addTo(map);

	   }

	});
	

});

