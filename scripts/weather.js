"use strict";
$(document).ready(function() {
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      // html = '<h6>'+weather.city+' '+weather.forecast[0].date+'</h6>';
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
    if (Park.all) {
      var randomPark = random(0,520);
      var parkId = Park.all[randomPark].id;
      return parkId;
    };
  };
});
