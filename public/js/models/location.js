var Location = function(info){
  this.name = info.name;
  this.id = info.place_id;
  this.icon = info.icon;
  this.address = info.vicinity;
  this.types = info.types;
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

// Location.prototype = {
//   getHours: function(){
//     var loc = this;
//     var url = "http://localhost:3000/locations/" + loc.id;
//     var request = $.getJSON(url)
//     .then(function(res){
//       var dailyHours = res.response.hours.timeframes;
//       console.log(loc.name);
//       console.log(dailyHours);
//       var today;
//       dailyHours.some(function(day){   //find better way to do this
//         today = day.includesToday ? day : nil;
//         return day.includesToday;
//       });
//       var hoursToday = today.open[0]; //will need to account for times when have multiple items in this array
//       loc.hoursToday = hoursToday.start + ' - ' + hoursToday.end; //move this into different file since returning below?
//       return hoursToday;
//     })
//     .fail(function(){
//       console.log('failure at hours');
//     });
//
//     return request;
//   }
// };

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
