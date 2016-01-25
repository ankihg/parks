(function(module) {

  var indexView = {};

  indexView.index = function() {
    populateFilters();
  };

  function populateFilters() {
    Park.allFeatures().forEach(function(feature) {
      var optionTag = '<option value="' + feature + '">' + feature + '</option>';
      $('#feature-filter').append(optionTag);
    });
  };


  module.indexView = indexView;
})(window);
