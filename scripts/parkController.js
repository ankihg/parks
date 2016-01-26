(function(module){
  parkController = {};
  // Park.fetchAll();

  parkController.index = function(){
    $('.park-index').show();
    $('#googleMap').show();
    $('#park-comments').hide();
    $('#events').hide();
  };

  parkController.byParkName = function(ctx){
    parkName = ctx.params.id;
    console.log(parkName);
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('.park-index').not('#'+parkName).hide();
    $('#park-comments').show();
  };

  parkController.loadParkPage = function(ctx) {
    ui();
    if (Park.all.length === 0) { Park.fetchAll(); }
    var park = Park.getById(ctx.params.id);
    park.makeForPage();
  };

  function ui() {
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('#park-info').hide();

    $('#park-page').show();
    $('#park-comments').show();

  }

  module.parkController = parkController;
})(window);


(function(module){

})(window);
