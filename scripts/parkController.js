(function(module){
  parkController = {};
  Park.fetchAll(indexView.index);

  parkController.index = function(ctx, next){
    $('section').not('#events').show();
    $('.park-index').show();
    $('#map-wrapper').show();
    $('#park-comments').hide();
    $('#events').hide();
    next();
  };

  parkController.byParkName = function(ctx){
    parkName = ctx.params.id;
    console.log($('.park-index').not('#'+parkName).hide());
    console.log(Park.all);
    $('#map-wrapper').hide();
    $('.park-index').not('#'+parkName).hide();
    $('#park-comments').show();
    console.log('why does this not work');
  };

  module.parkController = parkController;
})(window);



(function(module){
  volunteerController = {};
  volunteerController.index = function(){
    $('section').not('#events').hide();
    $('#map-wrapper').hide();
    $('#events').show();
  };

  module.volunteerController = volunteerController;
})(window);
