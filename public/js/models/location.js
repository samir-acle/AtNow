var Location = function(info){
  this.name = info.name.length > 25 ? info.name.slice(0,25) : info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
  this.rating = info.rating;
  this.count = info.count;
  this.userUpvote = info.userUpvote;
  this.userDownvote = info.userDownvote;
  this.url = "https://www.google.com/maps/search/" + info.name;
};

Location.prototype.postVote = function(vote) {
  var self = this;
  $.ajax({
    url: "http://127.0.0.1:3000/votes/",
    type: "POST",
    dataType: "json",
    data: {
      location_id: self.id,
      vote: vote,
      name: self.name
    }
  }).then(function(res){
    console.log('worked');
    session.needReload = true;
    session.reload();
  })
  .fail(function(err){
    console.log('post failed');
  });
};

Location.fetch = function(type){
  type = type || "food|store|bar";

  var lat = session.currentLat ? session.currentLat : map.lat;
  var long = session.currentLong ? session.currentLong : map.lng;

  var request = $.getJSON("http://127.0.0.1:3000/locations/", {
    lat: lat,
    long: long,
    type: type
  })
  .then(function(res){
    var venues = res;
    var locations = [];
    for (var i = 0; i < venues.length; i++) {
      var newLoc = new Location(venues[i]);
      locations.push(newLoc);
    }
    return locations;
  })
  .fail(function(){
    console.log('location fetch fail');
  });

  return request;
};
