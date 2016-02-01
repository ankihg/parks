"use strict";
(function(module) {

  var indexController = {};

  indexController.index = function() {
    ui();
    Park.fetchAll(indexView.index);
  };


  function ui() {
    window.scrollTo(0, 0);

    $('#park-comments').hide();
    $('#events').hide();
    $('#park-page').hide();
    $('#about-us').hide();

    $('#park-info').show();
    $('#googleMap').show();
  }

  module.indexController = indexController;
})(window);
