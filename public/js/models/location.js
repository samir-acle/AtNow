var Location = function(info){
  this.name = info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
  this.rating = info.rating;
  this.count = info.count;
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
    //TODO: refactor out below since in code in script.js
    //TODO: fix so will update both categories
    session.loadLocations().then(function(data){
      session.createLocationViews();
    });
  })
  .fail(function(){
    alert('FAILRUE');
  });
};

Location.fetch = function(type){
  var lat;
  var long;
  type = type || "food|store|bar"; //change defaults - make it preference?
  console.log('type', type);

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
    console.log('res',res);
    var venues = res;
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
