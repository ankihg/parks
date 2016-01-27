(function(module){
  parkController = {};

  parkController.loadParkPage = function(ctx, next) {
    ui();
    var park = Park.getById(ctx.params.id);
    console.log('park: '+park.name);
    park.makeForPage();
    next();
  };

  parkController.ensureParkAll = function(ctx, next) {
    if (Park.all.length === 0) { Park.fetchAll(next); }
    else { next(); }
  }

  function ui() {
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('#park-info').hide();
    $('#events').hide();

    $('#park-page').show();
    $('#park-comments').show();
  }

  module.parkController = parkController;
})(window);


(function(module){

})(window);
