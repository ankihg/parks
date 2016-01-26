
var MapView = {};

MapView.map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: new google.maps.LatLng(47.53, -122.30),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

MapView.makeMarkers = function(){
  var infowindow = new google.maps.InfoWindow();

  Park.all.map(function(p) {
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

  });

};

    google.maps.event.addListener(MapView.map,'dragend', function() {
      console.log('drag end');

      Park.toDisplay = Park.filterForCheckedFeatures(Park.all);
      Park.toDisplay = Park.filterNearestN(Park.toDisplay, 10, MapView.map);

      Park.display();
    });
