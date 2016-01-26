(function(module) {

  var indexView = {};

  indexView.index = function() {
    populateFilter();
    handleFilter();
    makeMarker();
  };

  function populateFilter() {
    Park.allFeatures().forEach(function(feature) {
      var optionTag = '<option value="' + feature + '">' + feature + '</option>';
      $('#feature-filter').append(optionTag);
    });
  };

  function handleFilter() {
    $('#feature-filter').on('change', function() {
        Park.toDisplay = Park.allWithFeature($(this).val());
        Park.display();
    });
  };


  module.indexView = indexView;
})(window);
