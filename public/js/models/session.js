var session = {};

session.getLocation = new Promise(function(resolve, reject) {
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;

    if (lat){
      resolve({lat: lat,long: long});
    } else {
      reject(Error("It broke")); //TODO: take to or show set location
    }
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(geoSuccess, function(){
      alert('unable to get position');
      reject(Error("It broke"));
    });
  } else {
    reject(Error("No geolocation"));
  }
});

session.loadLocations = function(){
  Location.fetchAll().then(function(res){
    session.showLocations(res);
  });
};

session.showLocations = function(locations) {
  locations.then(function(res){
    session.createViews(res);
  });
};

session.createViews = function(array) {
  $('.loc-container').empty();
  array.forEach(function(location){
    var view = new LocationView(location); //store in model for future access
    view.render();
  });
};
