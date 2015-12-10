var Movie = function(theater, movie, time){
  this.theaterName = theater;
  this.movieTitle = movie;
  this.showtime = time;
}; //gamble on movies?

Movie.fetch = function(){
  var lat = session.currentLat ? session.currentLat : map.lat;
  var long = session.currentLong ? session.currentLong : map.lng;

  var request = $.getJSON("http://localhost:3000/movies/", {
    lat: lat,
    long: long
  }).then(function(data){
    console.log('movies', data);
    var movies = [];
    for (var i = 0; i < data.length; i++) {
      var theater = data[i];
      var theaterName = theater.theater;
      for (var j = 0; j < theater.movies.length; j++) {
        var movie = theater.movie[j];
        var movieTitle = theater.movie[j].title;
        for (var k = 0; k < movie.showtimes.length; k++) {
          var showtime = movie.showtimes[k];
          movies.push(new Movie(theaterName, movieTitle, showtime));
        }
      }
    }
    return movies;
  });
  return request;
};
