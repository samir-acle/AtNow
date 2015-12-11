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
      // alert('unable to get position');
      reject(Error("It broke"));
    });
  } else {
    reject(Error("No geolocation"));
  }
});

session.loadLocations = function(type){
  console.log('loading locations');
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
  console.log('creating views');
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

session.message = {};

session.grabLoginErrors = function() {
  var self = this;
  var url = "http://127.0.0.1:3000/failedlogin";
  var request = $.getJSON(url).then(function(req, res){
    var sessionmessage = req;
    var type = sessionmessage.success;
    var message = sessionmessage.message;
    session.showErrors(message, type);
    return req;
  }).fail(function(response){
  });
  return request;
};

session.grabSignUpErrors = function(){
  var self = this;
  var url = "http://127.0.0.1:3000/failedsignup";
  var request = $.getJSON(url).then(function(req, res){
    var sessionmessage = req;
    var type= sessionmessage.success;
    var message = sessionmessage.message;
    session.showErrors(message, type);
    return req;
  });
  return request;
};
// this needs to go to session view:
// showing session errors for signup and login

session.showErrors = function(message, type){
  var sessionMessage = $(".sessionmessage");
  if(type){
    sessionMessage.removeClass("alert-danger");
    sessionMessage.addClass("alert-success");
  }
  else{
    sessionMessage.removeClass("alert-success");
    sessionMessage.addClass("alert-danger");
  }
  sessionMessage.html(message);
  sessionMessage.fadeIn(800);
  $("body").on("click", function(){
    sessionMessage.fadeOut(800);
  });
};

session.showLogout = function(){
  var logoutMessage = $(".successmessage");
  logoutMessage.fadeIn(800);
  $("body").on("click", function(){
    logoutMessage.fadeOut(800);
  });
};



// function to hide and show buttons:
// session.toggleButtons = function(){
//   if(userSession){
//     $(".login").css("display", "none");
//     $(".signup").css("display", "none");
//   }
// };

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

session.reload = function(){
  session.needReload = true;
  session.loadLocations().then(function(data){
    session.createLocationViews();
  });
};

//TODO: change sessions to this where applicable
