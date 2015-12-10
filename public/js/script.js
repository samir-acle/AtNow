$(document).ready(function(){

  userView.showLogin();
  userView.showSignup();
  userView.submitForm();
  userView.logOut();
  userView.clickAccountInfo();

//TODO: put in function so can call again (dont include location call
//TODO: make so can choose location
  session.setState('restaurant|bar');
  session.getLocation.then(function(res){
    session.currentLat = res.lat;
    session.currentLong = res.long;
    session.loadLocations().then(function(data){
      session.createLocationViews();
    });
    session.loadLocations('store');
    Movie.loadMovies();
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

  var movieIntervalID = window.setInterval(function(){
    Movie.loadMovies();
  }, 60000);

});
