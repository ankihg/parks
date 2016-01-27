
var MapView = {};

// MapView.parksToMark = [];
MapView.markers = [];

MapView.map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: new google.maps.LatLng(47.53, -122.30),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

var posInfoWindow = new google.maps.InfoWindow({map: MapView.map});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
      posInfoWindow.setPosition(pos);
      posInfoWindow.setContent('You are here!');
      MapView.map.setCenter(pos);
  });
}

MapView.init = function() {
  if (!MapView.parksToMark) {
    MapView.parksToMark = Park.all;
    MapView.makeMarkers();
  }

  google.maps.event.addListener(MapView.map,'dragend', function() {
    Park.toDisplay = Park.filterForCheckedFeatures(Park.all);
    Park.toDisplay = Park.filterNearestN(Park.toDisplay, 10, MapView.map);
    Park.display();
  });
}

MapView.makeMarkers = function(){
  MapView.removeMarkers();

  MapView.parksToMark.map(function(p) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(p.lat, p.lng),
      map: MapView.map,
      icon: '/media/tree.png'
    });

    var infowindow = new google.maps.InfoWindow({
       content: 'Name:' + '<a href="/parks/' + p.id + '">' + p.name + '</a><br/>' + 'Address: ' + p.address
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
}
