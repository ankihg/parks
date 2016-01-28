"use strict";
var MapView = {};

// MapView.parksToMark = [];
MapView.markers = [];
MapView.centerMarker;
MapView.geoMarker;

MapView.map = new google.maps.Map(document.getElementById('googleMap'), {
  zoom: 10,
  center: new google.maps.LatLng(47.53, -122.30),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

// var posInfoWindow = new google.maps.InfoWindow({map: MapView.map});

MapView.setGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      MapView.map.setCenter(pos);
      MapView.centerMarker.setPosition(MapView.map.getCenter());
      MapView.map.setZoom(12);
      MapView.updateLoc();


      if (!MapView.geoMarker) {
        MapView.geoMarker = new google.maps.Marker({
          position: new google.maps.LatLng( position.coords.latitude, position.coords.longitude),
          map: MapView.map,
          icon: 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue.png'
        });

        var infowindow = new google.maps.InfoWindow({
          content: 'You are here!'
        });

        google.maps.event.addListener(MapView.geoMarker ,'click',function() {
          MapView.setGeolocation();
        });
      } else {
        MapView.geoMarker.setPosition(new google.maps.LatLng( position.coords.latitude, position.coords.longitude));
      }

    });
  }
};

MapView.init = function() {
  MapView.setGeolocation();

  if (!MapView.parksToMark) {
    MapView.parksToMark = Park.all;
    MapView.makeMarkers();
  }

  if (!MapView.centerMarker) {
    MapView.centerMarker = new google.maps.Marker({
      position: MapView.map.getCenter(),
      map: MapView.map,
      icon: '/media/crosshair.png'
    });
  }

  google.maps.event.addListener(MapView.map,'dragend', function() {
    MapView.updateLoc();
  });

  google.maps.event.addListener(MapView.map,'center_changed', function() {
    MapView.centerMarker.setPosition(MapView.map.getCenter());
  });
};

MapView.makeMarkers = function(){
  MapView.removeMarkers();

  MapView.parksToMark.map(function(p) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(p.lat, p.lng),
      map: MapView.map,
      icon: '/media/tree.png'
    });

    var infowindow = new google.maps.InfoWindow({
      content: MapView.makeInfowindow(p)
      //  content: 'Name:' + '<a href="/parks/' + p.id + '">' + p.name + '</a><br/>' + 'Address: ' + p.address
    });

    google.maps.event.addListener(marker,'click',function() {
      infowindow.open(MapView.map,marker);
    });

    MapView.markers.push(marker);
  });

};

MapView.removeMarkers = function() {
  MapView.markers.map(function(m) {
    m.setMap(null);
  });
  MapView.markers = [];
};

MapView.updateLoc = function() {
  Park.toDisplay = Park.filterForCheckedFeatures(Park.all);
  Park.toDisplay = Park.filterNearestN(Park.toDisplay, 10, MapView.map);
  Park.display();
};

MapView.makeInfowindow= function(park) {
  var template = Handlebars.compile($('#park-infowindow-template').text());
  if (!park.featuresDisplay) { park.makeFeaturesDisplay(); }
  return template(park);
};
