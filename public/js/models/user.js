var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};

var currentUser = {}; //maybe dont need
var UserSession = false;
var userResponse = {};
// globalCurrentUser = {};
// need to create object for user new Object()

User.fetch = function() {
  var self = this;
  var url = "http://127.0.0.1:3000/user";
  var request = $.getJSON(url).then(function(req, res){
    currentUser = req; //maybe get rid of
    return req;
  }).fail(function(res){
    session.message = res;
    session.showErrors();
  });
  return request;
};

User.logOut = function(){
  var self = this;
  var url = "http://127.0.0.1:3000/logout";
  $.getJSON(url, function(response){
    // console.log(response);
  }).then(function(res){
    console.log("LOGOUT!");
    if(!jQuery.isEmptyObject(currentUser)){
      currentUser = {};
      userView.currentUser = {};
      session.showLogout();
    }
    session.reload();
    // userView.toggleLoginDisplays();
    // userView.toggleLogoutDisplays();
  }).fail(function(res){
    console.log("FAILED LOGOUTTTT");
    alert("failure from user post");
  });
};


// explaining options???
User.post = function(){
  var self = this;
  var url = "http://127.0.0.1:3000/signup";
  var request = $.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    data: {
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val(),
      email: $("#email").val(),
      password: $("#password").val()
    }
  }).then(function(res){
    $(".allvotesdiv").empty();
    User.fetch();
    var sessionmessage = res;
    var message = sessionmessage.message;
    var type = sessionmessage.success;
    session.showErrors(message, type);
    // userView.toggleLoginDisplays();
    return res;
  }).fail(function(res){
    alert("failure from user post");
  });
};

User.postLogin = function(){
  // resetting form
  var self = this;
  var url = "http://127.0.0.1:3000/login";
  var request = $.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    data: {
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val(),
      email: $("#email").val(),
      password: $("#password").val()
    }
  }).then(function(res, req){
    $(".allvotesdiv").empty();
    User.fetch();
    console.log("returning  " + res + " or " + req);
    var sessionmessage = res;
    var message = sessionmessage.message;
    var type = sessionmessage.success;
    session.showErrors(message, type);
    session.reload();
    // IF its a sucess, hide login displays
    // userView.toggleLoginDisplays();
  });
};
