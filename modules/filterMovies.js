module.exports = function(theaters, callback){
  var data = [];
  var currentTime = Date.now();

  theaters.forEach(function(theater){
    var theaterName = theater.name;
    var movies = [];
    theater.movies.forEach(function(movie){
      var movieTitle = movie.title;
      var showtimes = [];
      movie.showtimes.forEach(function(showtime){
        if (showtime - currentTime > 0) {
          showtimes.push(showtime);
        }
      });

      if (showtimes.length !== 0) {
        movies.push({
          title: movieTitle,
          showtimes: showtimes
        });
      }
    });
    if (movies.length !== 0) {
      data.push({
        theater: theaterName,
        movies: movies
      });
    }
  });

  callback('nope');

  // if (data.length !== 0 ) {
  //   callback(null,data);
  // } else {
  //   callback('nope');
  // }
};
