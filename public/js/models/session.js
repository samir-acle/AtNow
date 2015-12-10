var session = {};

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

session.error = {};

session.grabLoginErrors = function() {
  var self = this;
  var url = "http://localhost:3000/failedlogin";
  var request = $.getJSON(url).then(function(req, res){
    console.log("THIS IS FETCHING THE Failed message");
    session.error = req;
    session.showErrors();
    return req;
  }).fail(function(response){
    console.log("JS failed to get message");
  });
  return request;
};

session.grabSignUpErros = function(){
  var self = this;
  var url = "http://localhost:3000/failedsignup";
  var request = $.getJSON(url).then(function(req, res){
    console.log("THIS IS FETCHING THE Failed signmessage");
    session.error = req;
    session.showErrors();
    return req;
  }).fail(function(response){
    console.log("JS failed to get message");
  });
  return request;
  };
// this needs to go to session view:
// showing session errors for signup and login
session.showErrors = function(){
  var sessionMessage = $(".sessionmessage");
  sessionMessage.html("<strong>Error : </strong>" + session.error.message);
  sessionMessage.fadeIn(500);
  $("body").on("click", function(){
    sessionMessage.fadeOut(1000);
    session.error = {};
  });
};

session.showLogout = function(){
  var logoutMessage = $(".logoutmessage");
  logoutMessage.fadeIn(500);
  $("body").on("click", function(){
    logoutMessage.fadeOut(1000);
  });
};
