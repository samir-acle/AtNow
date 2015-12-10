// for all showtimes
// var Movie = function(theater, movie, time){
//   this.theaterName = theater;
//   this.movieTitle = movie;
//   this.showtime = time;
//   // this.url =
// }; //gamble on movies?

//for most recent
var Movie = function(info) {
  this.time = info.time;
  this.title = info.title;
  this.theater = info.theater;
  this.url = "https://www.google.com/maps/search/" + info.theater;
};

Movie.fetch = function(){
  var lat = session.currentLat ? session.currentLat : map.lat;
  var long = session.currentLong ? session.currentLong : map.lng;

  var request = $.getJSON("http://127.0.0.1:3000/movies/", {
    lat: lat,
    long: long
  }).then(function(data){
    console.log('movies', data);
    var movies = [];
    for (var i = 0; i < data.length; i++) {

      // for all showtimes
      // var theater = data[i];
      // var theaterName = theater.theater;
      // for (var j = 0; j < theater.movies.length; j++) {
      //   var movie = theater.movie[j];
      //   var movieTitle = theater.movie[j].title;
      //   for (var k = 0; k < movie.showtimes.length; k++) {
      //     var showtime = movie.showtimes[k];
      //     movies.push(new Movie(theaterName, movieTitle, showtime));
      //   }
      // }

      // for most recent 10
      movies.push(new Movie(data[i]));
    }
    return movies;
  });
  return request;
};

Movie.loadMovies = function(){
  Movie.fetch().then(function(movies){
    Movie.createMovieViews(movies);
  });
};

Movie.createMovieViews = function(movies){
  $('.loc-container').empty();
  movies.forEach(function(movie){
    var view = new MovieView(movie); //store in model for future access
    view.render();
  });
};
