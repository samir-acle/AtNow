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
    var movies = [];
    for (var i = 0; i < data.length; i++) {
      movies.push(new Movie(data[i]));
    }
    return movies;
  });
  return request;
};

Movie.loadMovies = function(){
  if(session.currentLong || map.lng ){
    Movie.fetch().then(function(movies){
      Movie.createMovieViews(movies);
    });
  }
};

Movie.createMovieViews = function(movies){
  $('.loc-container').empty();
  movies.forEach(function(movie){
    var view = new MovieView(movie);
    view.render();
  });
};
