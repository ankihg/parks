(function(module) {

  var indexView = {};

  indexView.index = function() {
    populateChecklist();
    handleChecklist();
    makeMarkers();
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
      Park.toDisplay = Park.all.filter(function(park) {
        for (var i=0; i < $checkedFeatures.length; i++) {
          if (park.features.indexOf($checkedFeatures.eq(i).val()) < 0) {
            return false;
          }
        }
        return true;
      });

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
