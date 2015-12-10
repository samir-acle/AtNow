var Movie = function(info){

};

Movie.fetch = function(){
  var lat = session.currentLat ? session.currentLat : map.lat;
  var long = session.currentLong ? session.currentLong : map.lng;

  var request = $.getJSON("http://localhost:3000/movies/", {
    lat: lat,
    long: long
  }).then(function(data){
    console.log('movies', data);
  });
};
