var Vote = require("../models/vote");
var User = require("../models/user");
var Location = require("../models/location");

module.exports = function(array, callback){
  console.log('in getvotecount');
  var oldArray = array;
  var newArray = [];

  function getCount() {
    if (oldArray.length === 0) {
      return callback(null, newArray);
    }

    var location = oldArray.pop();

    Location.findOne({"location_id" : location.place_id}, function(err, loc){
      var voteCount = loc ? loc.count : 0;
      location.count = voteCount;
      newArray.push(location);
      getCount();
    });
  }

  getCount();
};
