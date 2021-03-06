"use strict";
$(document).ready(function() {
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      var html = "";
      html += '<a href="/parks/'+randomPark()+'"><img id="weather-img" src="/media/weather/'+weather.code+'.png"></a>';
      html += '<span>'+weather.currently+'</span><br><span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
      html += '<small><br>Sunrise: '+weather.sunrise+' &nbsp; | &nbsp; Sunset: '+weather.sunset+'</small>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
  function randomPark(){
    function random(min,max){
      return Math.floor(Math.random()*(max -min) + min);
    };
    if (Park.all && (Park.all.length !== 0)) {
      var randomPark = random(0, Park.all.length);
      var parkId = Park.all[randomPark].id;
      return parkId;
    };
  };
});
