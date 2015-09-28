$(document).ready(function(){

	L.mapbox.accessToken = 'pk.eyJ1IjoibWFudWFiYWxvcyIsImEiOiJjaWYzdzcyZ3cwMGwwdGZseWVma2IxeXM5In0.oiCfQ9C3Yf7IQJecd3auZg';
	var geolocate = document.getElementById('geolocate');
	var map = L.mapbox.map('map', 'mapbox.streets').setView([40.087802, -3.873294], 6);

	var myLayer = L.mapbox.featureLayer().addTo(map);

	// This uses the HTML5 geolocation API, which is available on
	// most mobile browsers and modern browsers, but not in Internet Explorer
	//
	// See this chart of compatibility for details:
	// http://caniuse.com/#feat=geolocation
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
	            'title': 'Here I am!',
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

});