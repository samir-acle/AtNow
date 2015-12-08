var Location = function(info){
  this.name = info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
};

Location.prototype.postVote = function(id) {
  $.ajax({
    url: "http://localhost:3000/votes/",
    type: "POST",
    dataType: "json",
    data: {
      location_id: id,
      vote: true
    }
  }).then(function(res){
    console.log(res);
  }).fail(function(){
    alert('FAILRUE');
  });
};

//TODO: refactor - move storing of location arrays and coords to a new model?
// Location.currentLoc = "0,0";
Location.fetchAll = function() {
  var restaurantsRequest = Location.fetch('restaurant').then(function(res){
    Location.restaurants = res;
    return res;
  });
  var storeRequest = Location.fetch('store').then(function(res){
    Location.stores = res;
    return res;
  });
  var barRequest = Location.fetch('bar').then(function(res){
    Location.bars = res;
    return res;
  });
  return restaurantsRequest;
};

Location.fetch = function(type){
  var lat;
  var long;
  type = type || "food|store|bar"; //change defaults - make it preference?
  console.log(type);
  if (this.currentLat) {
    lat = this.currentLat;
    long = this.currentLong;
  }
  var request = $.getJSON("http://localhost:3000/locations/", {
    lat: lat,
    long: long,
    type: type
  })
  .then(function(res){
    var venues = res.results;
    console.log(venues);
    var locations = [];
    for (var i = 0; i < venues.length; i++) {
      locations.push(new Location(venues[i]));
    }
    return locations;
  })
  .fail(function(){
    console.log('location fetch fail');
  });

  return request;
};

Location.getLocation = new Promise(function(resolve, reject) {
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;
    console.log('what what');
    Location.currentLat = lat;
    Location.currentLong = long;

    if (Location.currentLat){
      console.log(Location.currentLat + ',' + Location.currentLong);
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, function(){
    alert('unable to get position');
    reject(Error("It broke"));
  });
});
