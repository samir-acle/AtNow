$(document).ready(function(){

  function makeFormAppear(){
    $(".login").on("click", function(){
      $("form").css("visibility", "visible");
      console.log("jquery working");
    });
  }
  makeFormAppear();

  // looks like its refreshing page still

  $('form').submit(function(evt) {
    var error;
    if ( !$('input').val() ) {
      console.log(userFormData);
      error = true;
    }
    if (error) {
      alert('Please fill in the rest of the fields');
      return false;
    }
  });



    $("form").submit(function(evt){
      User.postLogin();
      console.log("PREVENT EVENT DEFAULT");
      evt.preventDefault();
     $("form").css("visibility", "hidden");
    });


  Location.getLocation.then(function(res){
    console.log(res);
    return Location.fetchAll();
  }, function(err) {
    console.log(err);
  })
  .then(function(locations){
    showLocations(locations);
  });

  $('.restaurants').on('click', function(){
    showLocations(Location.restaurants);
  });

  $('.stores').on('click', function(){
    showLocations(Location.stores);
  });

  $('.bars').on('click', function(){
    showLocations(Location.bars);
  });
});

function showLocations(locations) {
  $('.loc-container').empty();
  locations.forEach(function(location){
    var view = new LocationView(location); //store in model for future access
    view.render();
  });
}
