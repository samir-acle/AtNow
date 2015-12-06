var Location = function(info){
  this.name = info.name;
};

Location.currentLoc = "0,0";

Location.fetch = function(){
  var lat;
  var long;
  if (this.currentLat) {
    lat = this.currentLat;
    long = this.currentLong;
  }
  var request = $.getJSON("http://localhost:3000/locations/", {
    lat: lat,
    long: long
  })
  .then(function(res){
    var venues = res.response.venues;
    var locations = [];
    for (var i =0; i < venues.length; i++) {
      locations.push(new Location(venues[i]));
    }
    return locations;
  })
  .fail(function(){
    console.log('location fetch fail');
  });

  return request;
};

// Location.getLocation = function(){
//   // if ("geolocation" in navigator) {
//   // /* geolocation is available */
//   // var geoLoc = function() {
//     var geoSuccess = function(position) {
//       startPos = position;
//       var lat = startPos.coords.latitude;
//       var long = startPos.coords.longitude;
//       console.log('what what');
//       Location.currentLoc = lat + ',' + long;
//     };
//
//     navigator.geolocation.getCurrentPosition(geoSuccess, function(){
//       alert('unable to get position');
//     });
//   };
  // } else {
  //   /* geolocation IS NOT available */
  // }
  // return geoLoc;
// };

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
