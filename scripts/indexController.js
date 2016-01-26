(function(module) {

  var indexController = {};

  indexController.index = function() {
    console.log('indexController index');
    ui();
    Park.fetchAll(indexView.index);
  }


  function ui() {
    $('#park-comments').hide();
    $('#events').hide();
    $('#park-page').hide();

    $('#park-info').show();
    $('#googleMap').show();
    $('#feature-checklist').show();
  }

  module.indexController = indexController;
})(window);
