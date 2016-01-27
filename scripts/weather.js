$(document).ready(function() {
  console.log('in weather.js');
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      // html = '<h6>'+weather.city+' '+weather.forecast[0].date+'</h6>';
      var html = "";
      html += '<img style="float:right; width: 39%; height: 35%" src="./media/weather/'+weather.code+'.png">';
      html += '<br><h6>'+weather.currently+'<br>Temp: '+weather.temp+'&deg;'+weather.units.temp+'</h6>';
      html += '<div><small>Sunrise: '+weather.sunrise+' &nbsp; | &nbsp; Sunset: '+weather.sunset+'</small></div>';
      console.log("workinghere");

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
