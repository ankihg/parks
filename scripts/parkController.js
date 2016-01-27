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
    var parkRef = new Firebase('https://lonepark.firebaseio.com/');
    var idRef = parkRef.child('parks');

    parkName = ctx.params.id;
    $('#park-info').on('click','.park-index', function(){
      var parkId = $(this)[0].id;
      var a = $.grep(Park.all, function(e){
        return e.id === parkId;
        });
      idRef.child(parkId).set(a[0]);
      });
      var expRef = new Firebase('https://lonepark.firebaseio.com/parks/'+parkName);
      expRef.on('value', function(snapshot){
        var parkData = snapshot.val();
        parkController.displaySingle(parkData);
        console.log(parkData);
      });
      // console.log(this)
    // });
    // console.log($('.park-index').not('#'+parkName).hide());
    // console.log(Park.all);
    $('#park-info').hide();
    $('#map-wrapper').hide();
    $('.park-index').not('#'+parkName).hide();
    $('#park-comments').show();
    // console.log('why does this not work');
  };

  parkController.displaySingle = function(value){
    var template = Handlebars.compile($('#park-index-template').text());
    $('body').append(template(value));
  }

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
