(function(module) {

  var Park = function(elm) {
    console.log('new park: '+elm);

    this.name = elm[9];
    this.address = elm[10];
    this.feature = elm[8];
    this.govURL = elm[11][0];
    this.lng = elm[12];
    this.lat = elm[13];

    console.log(this);
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
    Park.all.push(new Park(elm));
  });

  // Park.all.forEach(function(p) {
  //   $('#parks').append(p.toHTML());
  // });
};


  module.Park = Park;
})(window);
