"use strict";
(function(module) {

  var indexView = {};

  indexView.index = function() {
    if ($('#feature-checklist').find('li').length === 0) {
      populateChecklist();
      handleChecklist();
    }
    MapView.init();
  };

  function populateChecklist() {
    Park.allFeatures().forEach(function(feature) {
      var optionTag = '<div class="col-sm-4"><li><label for="chk1"><input type="checkbox" name="chk1" value="'+feature+'"> '+Park.asImg(feature)+feature+'</label></li></div>';
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

  module.indexView = indexView;
})(window);
