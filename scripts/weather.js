$(document).ready(function() {
  console.log('in weather.js');
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      // html = '<h6>'+weather.city+' '+weather.forecast[0].date+'</h6>';
      var html = "";
      html += '<img style="width: 82px; height: 82px;" src="/media/weather/'+weather.code+'.png"></img>';
      html += '<h6 style="width: 82px; height: 82px">'+weather.currently+'<br>'+weather.temp+'&deg;'+weather.units.temp+'</h6>';
      html += '<div style="line-height:0%;"><small>Sunrise: '+weather.sunrise+' &nbsp; | &nbsp; Sunset: '+weather.sunset+'</small></div>';
      console.log("workinghere");

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
