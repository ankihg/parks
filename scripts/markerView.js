var locations = [this.name,this.lat,this.lng];

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 10,
      center: new google.maps.LatLng(47.60 , -122.33 ),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(Park.name);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
