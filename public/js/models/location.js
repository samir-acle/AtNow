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
    return res;
  }).fail(function(){
    alert('FAILRUE');
  });

  return request;
};


Location.prototype.postVote = function(vote) {
  var self = this;
  console.log(self);
  $.ajax({
    url: "http://localhost:3000/votes/",
    type: "POST",
    dataType: "json",
    data: {
      location_id: self.id,
      vote: vote
    }
  }).then(function(res){
    session.loadLocations(res);
   })
  .fail(function(){
    alert('FAILRUE');
  });
};

function createPromise(array) {
  Location.addCount = new Promise(function(resolve, reject){ //TODO: add reject
      var oldArray = array;
      var newArray = [];

      function getCount() {
        if (oldArray.length === 0) {
          resolve(newArray);
          return;
        }

        var location = oldArray.pop();

        location.getVoteCount().then(function(count){
          location.count = count;
          newArray.push(location);
          getCount();
        });
      }

      getCount();

      return newArray;
  });
}

//TODO: refactor - move storing of location arrays and coords to a new model?
// Location.currentLoc = "0,0";
Location.fetchAll = function() {
  console.log('fetching');
  var restaurantsRequest = Location.fetch('restaurant|bar').then(function(res){
    createPromise(res);
    var request = Location.addCount.then(function(res){
      Location.restaurants = res;
      var sortedList = Location.restaurants.sort(function(a,b){
        return b.count - a.count;
      });
      return res;
    });
    return request;
  });

  var storesRequest = Location.fetch('store').then(function(res){
    createPromise(res);
    var request = Location.addCount.then(function(res){
      Location.stores = res;
      var sortedList = Location.stores.sort(function(a,b){
        return b.count - a.count;
      });
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

  if (session.currentLat) { //TODO: add option to choose location, remove this check
    lat = session.currentLat;
    long = session.currentLong;
  }
  var request = $.getJSON("http://localhost:3000/locations/", {
    lat: lat,
    long: long,
    type: type
  })
  .then(function(res){
    var venues = res.results;
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
