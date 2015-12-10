var session = {
  needReload: false
};

session.getLocation = new Promise(function(resolve, reject) {
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;

    if (lat){
      resolve({lat: lat,long: long});
    } else {
      reject(Error("It broke")); //TODO: take to or show set location
    }
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(geoSuccess, function(){
      alert('unable to get position');
      reject(Error("It broke"));
    });
  } else {
    reject(Error("No geolocation"));
  }
});

session.loadLocations = function(type){
  type = type || history.state.type;
  var request = Location.fetch(type).then(function(data){
    data.sort(function(a,b){
      return b.count - a.count;
    });
    session.saveLocations(data,type);
  });
  return request;
};

session.setState = function(type){
  history.pushState({'type' : type}, type, '#' + type);
};

session.createLocationViews = function(type){
  type = type || history.state.type;
  var array = session[type.split('|')[0]];
  $('.loc-container').empty();
  array.forEach(function(location){
    var view = new LocationView(location); //store in model for future access
    view.render();
  });
};

session.saveLocations = function(data, type) {
  session[type.split('|')[0]] = data;
};

session.changeType = function(){
  if(session.needReload){
    session.loadLocations().then(function(data){
      session.createLocationViews();
    });
  } else {
    session.createLocationViews();
  }

  session.needReload = false;
};

//TODO: change sessions to this where applicable
