(function(module){
  parkController = {};
  // Park.fetchAll();

  parkController.index = function(){
    $('.park-index').show();
    $('#googleMap').show();
    $('#park-comments').hide();
    $('#events').hide();
    $('#about-us').hide();
  };

  parkController.about = function(){
    $('.park-index').hide();
    $('#googleMap').hide();
    $('#park-comments').hide();
    $('#events').hide();
    $('#feature-checklist').hide();
    $('#about-us').show();
  };

  parkController.byParkName = function(ctx){
    parkName = ctx.params.id;
    console.log(parkName);
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('.park-index').not('#'+parkName).hide();
    $('#about-us').hide();
    $('#park-comments').show();
  };

  parkController.loadParkPage = function(ctx) {
    // ui();
    // parkName= ctx.params.id;
    // var expRef = new Firebase('https://lonepark.firebaseio.com/parks/'+parkName);
    // expRef.on('value', function(snapshot){
    //   var parkData = snapshot.val();
    //   display(parkData);
    //   console.log(parkData);
    // });
    ui();
    var park = Park.getById(ctx.params.id);
    console.log('park: '+park.name);
    park.makeForPage();

  };

  parkController.ensureParkAll = function(ctx, next) {
    if (Park.all.length === 0) { Park.fetchAll(next); }
    else { next(); }
  }


   function display(value){
    var template = Handlebars.compile($('#park-page-template').text());
    $('#park-page').append(template(value));
  }

  function ui() {
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('#park-info').hide();
    $('#events').hide();
    $('#about-us').hide();

    $('#park-page').show();
    $('#park-comments').show();
  }

  module.parkController = parkController;
})(window);


(function(module){

})(window);
