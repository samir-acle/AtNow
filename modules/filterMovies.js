module.exports = function(theaters, callback){
  var data = [];
  var currentTime = Date.now();

  // to return all to front end
  // theaters.forEach(function(theater){
  //   var theaterName = theater.name;
  //   var movies = [];
  //   theater.movies.forEach(function(movie){
  //     var movieTitle = movie.title;
  //     var showtimes = [];
  //     movie.showtimes.forEach(function(showtime){
  //       var timeDiff = showtime - currentTime;
  //       if (timeDiff > 0 && timeDiff < 1) { //TODO: determine if time good
  //         showtimes.push(showtime);
  //       }
  //     });
  //
  //     if (showtimes.length !== 0) {
  //       movies.push({
  //         title: movieTitle,
  //         showtimes: showtimes
  //       });
  //     }
  //   });
  //   if (movies.length !== 0) {
  //     data.push({
  //       theater: theaterName,
  //       movies: movies
  //     });
  //   }
  // });
  // callback(null, data);

  // if (data.length !== 0 ) {
  //   callback(null,data);
  // } else {
  //   callback('nope');
  // }


  // to return only soonest 10 sorted by soonest
  var limit = 10;
  var showtimes = [];

  theaters.forEach(function(theater){
    var theaterName = theater.name;
    var movies = [];
    theater.movies.forEach(function(movie){
      var movieTitle = movie.title;
      var showtimes = [];
      movie.showtimes.forEach(function(showtime){
        var timeDiff = showtime - currentTime;
        if (timeDiff > 0 && timeDiff < 3600000) { //TODO: determine if time good
          showtimes.push({
            time: showtime,
            title: movieTitle,
            theater: theaterName
          });
        }
      });
    });
  });

  var sortedShowtimes = showtimes.sort(function(a,b){
    return a.time < b.time ? 1 : -1;
  });

  if (limit > showtimes.length){
    var limitedShowtimes = sortedShowtimes.slice(0,limit);
  }

  callback(null, limiteShowtimes);

  // if (data.length !== 0 ) {
  //   callback(null,data);
  // } else {
  //   callback('nope');
  // }
};
