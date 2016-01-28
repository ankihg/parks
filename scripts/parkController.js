(function(module){
  parkController = {};

  parkController.about = function(){
    $('#park-info').hide();
    $('#googleMap').hide();
    $('#park-comments').hide();
    $('#events').hide();
    $('#feature-checklist').hide();
    $('#park-page').hide();


    $('#about-us').show();
  };

  parkController.loadParkPage = function(ctx, next) {
    ui();
    var park = Park.getById(ctx.params.id);
    park.makeForPage();
    if (next) { next(); }
  };

  parkController.ensureParkAll = function(ctx, next) {
    if (Park.all.length === 0) { Park.fetchAll(next); }
    else if (next) { next(); }
  };

  function ui() {
    $('#feature-checklist').hide();
    $('#googleMap').hide();
    $('#park-info').hide();
    $('#events').hide();
    $('#about-us').hide();

    window.scrollTo(0, 0);


    $('#park-page').show();
    $('#park-comments').show();
  }

  module.parkController = parkController;
})(window);


(function(module){

})(window);
