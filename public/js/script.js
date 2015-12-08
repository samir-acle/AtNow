$(document).ready(function(){
  Location.getLocation.then(function(res){
    console.log(res);
    return Location.fetchAll();
  }, function(err) {
    console.log(err);
  })
  .then(function(locations){
    console.log('should show location');
    showLocations(locations);
  });


  $('.restaurants').on('click', function(){
    showLocations(Location.restaurants);
  });

  $('.stores').on('click', function(){
    showLocations(Location.stores);
  });

  // $('.bars').on('click', function(){
  //   showLocations(Location.bars);
  // });
});

function showLocations(locations) {
  $('.loc-container').empty();
  locations.forEach(function(location){
    var view = new LocationView(location); //store in model for future access
    view.render();
  });
}
