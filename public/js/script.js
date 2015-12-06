$(document).ready(function(){
  Location.getLocation.then(function(res){
    console.log(res);
    return Location.fetch();
  }, function(err) {
    console.log(err);
  })
  .then(function(locations){
    locations.forEach(function(location){
      location.getHours().then(function(hours){
        var view = new LocationView(location);
        view.render();
      });
    });
  });
});
