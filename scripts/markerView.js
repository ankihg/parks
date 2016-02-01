"use strict";
var MapView = {};

MapView.markers = [];
MapView.centerMarker;
MapView.geoMarker;
MapView.map;

MapView.makeMainMap = function() {
  MapView.map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 11,
    center: new google.maps.LatLng(47.61913, -122.341049),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
};

MapView.init = function() {
  if (!MapView.map) { MapView.makeMainMap(); }

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

  MapView.makeToggleFilterButton();

  google.maps.event.addListener(MapView.map,'dragend', function() {
    MapView.updateLoc();
  });

  google.maps.event.addListener(MapView.map,'center_changed', function() {
    MapView.centerMarker.setPosition(MapView.map.getCenter());
  });
};

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

MapView.makeToggleFilterButton = function() {
  var buttonDiv = document.getElementById('toggleFilterButton');
  if (!buttonDiv) {
    buttonDiv = document.createElement('button');
    buttonDiv.id = 'toggleFilterButton';
    buttonDiv.innerHTML = "filter";
    buttonDiv.onclick = MapView.toggleFilterDisplay;
    MapView.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(buttonDiv);
  }
};

MapView.toggleFilterDisplay = function() {
  if ($('#toggleFilterButton').text() === 'filter') {
    $('#googleMap').removeClass('twelve').removeClass('columns');
    $('#googleMap').addClass('eight').addClass('columns');

    $('#feature-checklist').show();

    $('#toggleFilterButton').text('hide');
  } else {
    $('#googleMap').removeClass('eight').removeClass('columns');
    $('#googleMap').addClass('twelve').addClass('columns');

    $('#feature-checklist').hide();

    $('#toggleFilterButton').text('filter');
  }
};
