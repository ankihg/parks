"use strict";
(function(module){

  var volunteerController = {};

  volunteerController.index = function(){
    ui();
  };

  function ui() {
    $('#googleMap').hide();
    $('#feature-checklist').hide();
    $('#park-info').hide();
    $('#events').show();
    $('#park-page').hide();
    $('#park-comments').hide();
    $('#about-us').hide();
  }
  module.volunteerController = volunteerController;
})(window);
