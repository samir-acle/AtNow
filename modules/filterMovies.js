var moment = require('moment');

module.exports = function(theaters, callback){
  var data = [];
  var currentTime = Date.now();
  var showtimes = [];

  theaters.forEach(function(theater){
    var theaterName = theater.name;
    theater.movies.forEach(function(movie){
      var movieTitle = movie.title;
      movie.showtimes.forEach(function(showtime){
        var timeDiff = showtime - currentTime;
        var momentDiff = moment().diff(showtime,'hours', true);
        if (momentDiff >= -2 && momentDiff < 0) { //TODO: determine if time good
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
    return b.time < a.time ? 1 : -1;
  });

  callback(null, sortedShowtimes);
};
