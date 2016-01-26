var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 10,
      center: new google.maps.LatLng(47.53, -122.30),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

var infowindow = new google.maps.InfoWindow();

var n = Math.min(10, Park.all.length);

var makeMarker = function(){
      var marker, i;
      for (i = 0; i < n; i++) {
      console.log(Park.all);
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(Park.all[i].lat, Park.all[i].lng),
        map: map
      });
  };


    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //     return function() {
    //       infowindow.setContent(locations[i][0]);
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i));
    // }

    // google.maps.event.addListener(map,'dragend', function() {
    //   console.log('drag end');
    //
    //   Park.toDisplay = Park.getNearestN(10, map);
    //   Park.display();
    // });
