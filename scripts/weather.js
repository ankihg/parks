$(document).ready(function() {
  console.log('in weather.js');
  $.simpleWeather({
    location: 'Seattle, WA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h6>'+weather.city+' '+weather.forecast[0].date+'</h6>';
      html += '<img style="float:right;" width="80px" src="./media/weather/'+weather.code+'.png">';
      html += '<h6>Temp: '+weather.temp+'&deg;'+weather.units.temp+' '+weather.currently+'</h6>';
      html += '<h6>Sunset: '+weather.sunset+'</h6>';
      console.log("workinghere");

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
