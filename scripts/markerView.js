var n = Math.min(10, Park.all.length)
  var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: new google.maps.LatLng(47.53, -122.30),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

var makeMarkers = function(){
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  for (i = 0; i < 10 ; i++) {
    console.log(Park.all);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(Park.all[i].lat, Park.all[i].lng),
      map: map
    });
    console.log(marker)
    // google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //   return function() {
    //     infowindow.setContent();
    //     infowindow.open(map, marker);
    //   }
    // })(marker, i));
  };
};
