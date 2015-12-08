var Location = function(info){
  this.name = info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
  this.rating = info.rating;
};

Location.prototype.getVoteCount = function(){
  var self = this; //cahnge back to id
  var request = $.ajax({
    url: "http://localhost:3000/locations/" + self.id,
    type: "GET",
    dataType: "json"
  }).then(function(res){
    console.log('res',res);
    return res;
  }).fail(function(){
    alert('FAILRUE');
  });

  return request;
};


Location.prototype.postVote = function(id, vote) {
  $.ajax({
    url: "http://localhost:3000/votes/",
    type: "POST",
    dataType: "json",
    data: {
      location_id: id,
      vote: vote
    }
  }).then(function(res){
    console.log(res);
  }).fail(function(){
    alert('FAILRUE');
  });
};

function createPromise(array) {
  Location.addCount = new Promise(function(resolve, reject){
      var oldArray = array;
      var newArray = [];
      console.log('old array',oldArray);

      function getCount() {
        if (oldArray.length === 0) {
          resolve(newArray);
          return;
        }

        console.log(oldArray);
        var location = oldArray.pop();
        console.log(location);
        location.getVoteCount().then(function(count){
          location.count = count;
          newArray.push(location);
          getCount();
        });
      }

      getCount();

      return newArray;
  });
  console.log(Location.addCount);
}

//TODO: refactor - move storing of location arrays and coords to a new model?
// Location.currentLoc = "0,0";
Location.fetchAll = function() {
  var restaurantsRequest = Location.fetch('restaurant|bar').then(function(res){
    createPromise(res);
    var request = Location.addCount.then(function(res){
      console.log('res fetch all', res);
      Location.restaurants = res;
      var sortedList = Location.restaurants.sort(function(a,b){
        return b.count - a.count;
      });
      console.log('sortedList',sortedList);

      return res;
    });
    return request;
  });

  var storesRequest = Location.fetch('store').then(function(res){
    createPromise(res);
    var request = Location.addCount.then(function(res){
      console.log('res fetch all', res);
      Location.stores = res;
      var sortedList = Location.stores.sort(function(a,b){
        return b.count - a.count;
      });
      console.log('sortedList',sortedList);
      return res;
    });
    return request;
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
