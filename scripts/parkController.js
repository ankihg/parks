(function(module){
  parkController = {};
  Park.fetchAll(indexView.index);

  parkController.index = function(){
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

})(window);
