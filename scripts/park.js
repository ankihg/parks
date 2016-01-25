(function(module) {

  var Park = function(elm) {
    // console.log('new park: '+elm);

    this.name = elm[9];

    this.features = [];
    this.features.push(elm[8]);

    this.address = elm[10];
    this.govURL = elm[11][0];
    this.lng = elm[12];
    this.lat = elm[13];

    // console.log(this);
  };

  Park.all = [];

Park.fetchAll = function(callNext) {
  if (localStorage.rawData) {
    Park.checkUpdate(callNext); //calls load either way
  } else {
    Park.update(callNext);
  }
};

Park.update = function(callNext) {
  console.log('update');
 $.getJSON('/data/parkFeatures.json', function(data, message, xhr) {
    Park.load(data.data);
    localStorage.rawData = JSON.stringify(data);
    localStorage.etag = xhr.getResponseHeader('eTag');
     if (callNext) { callNext(); }
  });

};

Park.checkUpdate = function(callNext) {
  console.log('check update');
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
  console.log(Park.all.map(function(p) {
    return p.name;
  }));

  Park.all.forEach(function(p) {
    $('#park-info').append(p.toParkIndexHTML());
  });
};

  Park.prototype.toParkIndexHTML = function() {
    var template = Handlebars.compile($('#park-index-template').text());

    return template(this);;
  };


  $(document).ready(function() {
    Park.fetchAll();
  });

  module.Park = Park;
})(window);
