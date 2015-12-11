var map = {};

map.initMap = function(){
  $('.set-location').on('click', function(){
    var location = $('input.location').val();
    map.geocodeLocation(location);
    session.loadLocations();
  });
  map.geocoder = new google.maps.Geocoder();
};

map.geocodeLocation = function(location) {
  map.geocoder.geocode( {'address' : location}, function(results){
    map.results = results[0].geometry.location;
    map.lat = map.results.lat();
    map.lng = map.results.lng();
    session.reload();
    session.loadLocations('store');
    Movie.fetch();
  });
};
