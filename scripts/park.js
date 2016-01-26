(function(module) {

  var Park = function(elm) {
    // console.log('new park: '+elm);

    this.name = elm[9];
    this.id = this.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-' );

    this.features = [];
    this.features.push(elm[8]);

    this.address = elm[10];
    this.govURL = elm[11][0];
    this.lng = parseFloat(elm[12]);
    this.lat = parseFloat(elm[13]);

    // console.log(this);
  };

  Park.all = [];
  Park.toDisplay = [];

Park.fetchAll = function(callNext) {
  if (localStorage.rawData) {
    Park.checkUpdate(callNext); //calls load either way
  } else {
    Park.update(callNext);
  }
};

Park.update = function(callNext) {
 $.getJSON('/data/parkFeatures.json', function(data, message, xhr) {
    Park.load(data.data);
    localStorage.rawData = JSON.stringify(data);
    localStorage.etag = xhr.getResponseHeader('eTag');
     if (callNext) { callNext(); }
  });

};

Park.checkUpdate = function(callNext) {
  $.ajax({
  type: 'HEAD',
  url: "/data/parkFeatures.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.etag !== etag) {
      Park.update(callNext);
    } else {
      Park.load(JSON.parse(localStorage.rawData).data);
      if (callNext) { callNext(); }
    }
  }
  });
};

Park.load = function(rawData) {
  Park.all = [];

  rawData.map(function(elm) {
    //handle repeat parks for each feature in parkFeatures.json
    var parkNames = Park.all.map(function(p) {
      return p.name;
    });

    var parkIndex = parkNames.indexOf(elm[9]);

    if (parkIndex === -1) { //not in Park.all, make park
      Park.all.push(new Park(elm));
    } else { // in Park.all, just push new feature to park.features
      Park.all[parkIndex].features.push(elm[8]);
    }
  });

  var n = Math.min(10, Park.all.length);
  for (var i=0; i<n; i++ ) {
    Park.toDisplay.push(Park.all[i]);
  }

  Park.display();
};

Park.display = function() {
  $('#park-info').empty();
  Park.toDisplay.map(function(p) {
    p.makeForIndex();
  });
}

  Park.prototype.makeForIndex = function() {
    $('#park-info').append(this.toParkIndexHTML());
    this.initStreetView();
  }


  Park.prototype.toParkIndexHTML = function() {
    var template = Handlebars.compile($('#park-index-template').text());
    return template(this);;
  };

  Park.prototype.initStreetView = function() {
    var loc = {lat: this.lat, lng: this.lng};
    var map = new google.maps.Map(document.getElementById(this.id+'-map'), {
      center: loc,
      zoom: 14
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById(this.id+'-pano'), {
          position: loc,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
    map.setStreetView(panorama);
  };

  Park.allFeatures = function() {
    return Park.all.map(function(p) {
      return p.features;
    })
    .reduce(function(uniqueFeatures, parkFeatures) {
      parkFeatures.filter(function(feature) {
        return uniqueFeatures.indexOf(feature) < 0;
      })
      .forEach(function (feature) {
        uniqueFeatures.push(feature);
      });
      return uniqueFeatures;
    }, []);
  };

  Park.allWithFeature = function(feature) {
    return Park.all.filter(function(p) {
      return p.features.indexOf(feature) >= 1;
    });
  };

  Park.getNearestN = function(n, map) {
    Park.all.sort(function(a,b) {
      return (a.distFromCenter(map)) - (b.distFromCenter(map));
    });
    return Park.all.slice(0, n);
  }

  Park.prototype.distFromCenter = function(map) {
    this.distFromMapCenter = Park.findDistance(new google.maps.LatLng(this.lat, this.lng), map.getCenter());
    return this.distFromMapCenter;
  }

  Park.findDistance = function(p1, p2) {
    //http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
  };

  module.Park = Park;
})(window);
