"use strict";
$(document).ready(function() {
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      // html = '<h6>'+weather.city+' '+weather.forecast[0].date+'</h6>';
      var html = "";
      html += '<img id="weather-img" src="/media/weather/'+weather.code+'.png">';
      html += '<span>'+weather.currently+'</span><br><span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
      html += '<small><br>Sunrise: '+weather.sunrise+' &nbsp; | &nbsp; Sunset: '+weather.sunset+'</small>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
