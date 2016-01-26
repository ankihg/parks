$(document).ready(function() {
  console.log('in weather.js');
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<p>'+weather.temp+'&deg;'+weather.units.temp+' Humidity: '+weather.humidity+'%'+' Sunset: '+weather.sunset+'</p>';
      console.log("workinghere");

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
