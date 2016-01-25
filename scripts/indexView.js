(function(module) {

  var indexView = {};

  indexView.index = function() {
    populateFilter();
  };

  function populateFilter() {
    Park.allFeatures().forEach(function(feature) {
      var optionTag = '<option value="' + feature + '">' + feature + '</option>';
      $('#feature-filter').append(optionTag);
    });
  };

  function handleFilter() {
    $('#feature-filter').on('change', function() {

    });
  };


  module.indexView = indexView;
})(window);
