$(document).ready(function(){
  session.mainMessage('Welcome to @Now');

  //set click handlers
  userView.showLogin();
  userView.showSignup();
  userView.submitForm();
  userView.logOut();
  userView.clickAccountInfo();

  window.setTimeout(function(){
    $('form').fadeIn();
  }, 1000);

  session.setState('restaurant|bar');
  session.getLocation.then(function(res){
    session.currentLat = res.lat;
    session.currentLong = res.long;
    session.reload();
    session.loadLocations('store');
    Movie.fetch();
  }, function(err) {
    session.showErrors('Unable to load data. Please try again by refreshing the page');
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
