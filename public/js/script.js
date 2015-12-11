$(document).ready(function(){
  session.mainMessage('Welcome to At Now');

  userView.showLogin();
  userView.showSignup();
  userView.submitForm();
  userView.logOut();
  // need a function when this
  userView.clickAccountInfo();

//TODO: put in function so can call again (dont include location call
//TODO: make so can choose location
  session.setState('restaurant|bar');
  session.getLocation.then(function(res){
    session.currentLat = res.lat;
    session.currentLong = res.long;
    session.reload();
    session.loadLocations('store');
    Movie.fetch();
  }, function(err) {
    console.log(err);
  });

  $('.restaurants').on('click', function(){
    session.setState('restaurant|bar');
    session.changeType();
  });

  $('.stores').on('click', function(){
    session.setState('store');
    session.changeType();
  });

  $('.movies').on('click', function(){
    session.setState('movies');
    Movie.loadMovies();
  });

  $('.set-location').on('click', function(){
    var location = $('input.location').val();
    map.geocodeLocation(location);
  });
});
