$(document).ready(function(){
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;
    console.log('what what');
    callFourSquare(lat,long);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, function(){
    alert('no');
  });
});

function callFourSquare(lat,long){
  var base = "https://api.foursquare.com/v2/venues/search";
  var options = [
    // ["intent", "checkin"],
    // ["radius", 800], //meters of specified location
    ["ll", lat + "," + long],
    ["openNow", 1]
  ];

  var clientID = "XXXXXXXX";
  var clientSecret = "XXXXXXXX";
  var url = base + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20151203";

  options.forEach(function(option){
    url = url + "&"+ option[0] + "=" + option[1];
  });

  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    console.log(response);
    appendLocs(response.response.venues);
  }).fail(function(){
    alert('failure');
  });
}

function appendLocs(venues){
  $('body').empty();
  venues.forEach(function(venue){
    $('body').append('<div class="loc">' + venue.name + '</div>');
  });
}
