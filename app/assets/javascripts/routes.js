$(document).ready(function(){

   	this_url = window.location.href;
   	L.mapbox.accessToken = 'pk.eyJ1IjoibWFudWFiYWxvcyIsImEiOiJjaWYzdzcyZ3cwMGwwdGZseWVma2IxeXM5In0.oiCfQ9C3Yf7IQJecd3auZg';
   	if(this_url == "http://localhost:3000/routes"){

   		$.ajax({
	    	type: 'GET',
	        dataType: 'json',
	        url: this_url,
	        success: function(data) { addMarkers(data); },
	        error: function(data) { console.log("Error ",data); }
		});

		
			var map = L.mapbox.map('map', 'mapbox.streets').setView([40.087802, -3.873294], 6);
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
		function addMarkers(data){

			for(i=0;i<data.route.length;i++){
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
				        description: data.route[i].description+"<ul><li><b>Dificultad:</b> "+data.route[i].difficulty+"</li><li><b>Distancia total:</b> "+data.route[i].distance+" km.</li></ul><a href='"+this_url+"/"+data.route[i].id+"' class='btn btn-default btn-mapbox-default'>Ver ruta</a>",
				        url: this_url+data.route[i].id,
				        // one can customize markers by adding simplestyle properties
				        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
				        'marker-size': 'large',
				        'marker-color': '#BE9A6B',
				        'marker-symbol': 'pitch'
				    }

			}).addTo(map);
			}
							
		}
   	}

});