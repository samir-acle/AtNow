var Location = function(info){
  this.name = info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
  this.rating = info.rating;
  this.count = info.count;
  this.userUpvote = info.userUpvote;
  this.userDownvote = info.userDownvote;
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
      vote: vote,
      name: self.name
    }
  }).then(function(res){
    //TODO: refactor out below since in code in script.js
    //TODO: fix so will update both categories
    session.reload();
  })
  .fail(function(){
    alert('FAILRUE');
  });
};

Location.prototype.getDetails = function(){
  var self = this;
  var request = $.getJSON("http://localhost:3000/locations/" + self.id).then(function(err,data){
    console.log('details', data);
  });
  return request;
};

Location.fetch = function(type){
  type = type || "food|store|bar"; //change defaults - make it preference?

  var lat = session.currentLat ? session.currentLat : map.lat;
  var long = session.currentLong ? session.currentLong : map.lng;

  if (!lat) {
    alert('please set a location');
    return;
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
      var newLoc = new Location(venues[i]);
      newLoc.getDetails();
      locations.push(newLoc);
    }
    return locations;
  })
  .fail(function(){
    console.log('location fetch fail');
  });

  return request;
};
