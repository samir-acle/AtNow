var Location = function(info){
  this.name = info.name;
};

Location.fetch = function(){
  var request = $.getJSON("http://localhost:3000/locations")
  .then(function(res){
    var venues = res.response.venues;
    var locations = [];
    for (var i =0; i < venues.length; i++) {
      locations.push(new Location(venues[i]));
    }
    console.log(locations);
  })
  .fail(function(){
    console.log('location fetch fail');
  });

  return request;
};
