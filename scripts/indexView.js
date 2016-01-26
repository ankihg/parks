(function(module) {

  var indexView = {};

  indexView.index = function() {
    populateChecklist();
    handleChecklist();
    MapView.init();
  };

  function populateChecklist() {
    Park.allFeatures().forEach(function(feature) {
      var optionTag = '<div class="col-sm-4"><li><label for="chk1"><input type="checkbox" name="chk1" value="'+feature+'"> '+feature+Park.asImg(feature)+'</label></li></div>';
      console.log(optionTag);
      $('#feature-checklist').append(optionTag);
    });
  };

  function handleChecklist() {
    $('#feature-checklist').on('change', function() {

      var $checkedFeatures = $(this).find(':checked');

      Park.toDisplay = Park.filterForCheckedFeatures(Park.all);

      MapView.parksToMark = Park.toDisplay;
      MapView.makeMarkers();

      Park.toDisplay = Park.filterNearestN(Park.toDisplay, 10, MapView.map);

      Park.display();
    });
  };

  // function populateFilter() {
  //   Park.allFeatures().forEach(function(feature) {
  //     var optionTag = '<option value="' + feature + '">' + feature + '</option>';
  //     $('#feature-filter').append(optionTag);
  //   });
  // };
  //
  // function handleFilter() {
  //   $('#feature-filter').on('change', function() {
  //       Park.toDisplay = Park.allWithFeature($(this).val());
  //       Park.display();
  //   });
  // };


  module.indexView = indexView;
})(window);
