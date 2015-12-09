$(document).ready(function(){

  userView.showLogin();
  userView.showSignup();
  userView.submitForm();
  userView.logOut();

  $("body").on("click", function(){
    var currentUser = User.fetch();
    console.log("THIS IS THE CURRENT USER!: " + currentUser);
    return currentUser;
  });

//TODO: put in function so can call again (dont include location call
//TODO: make so can choose location
  session.getLocation.then(function(res){
    session.currentLat = res.lat;
    session.currentLong = res.long;
    session.loadLocations();
  }, function(err) {
    console.log(err);
  });

  $('.restaurants').on('click', function(){
    session.createViews(Location.restaurants);
  });

  $('.stores').on('click', function(){
    session.createViews(Location.stores);
  });
});


//TODO: change so reloads currrent tab
