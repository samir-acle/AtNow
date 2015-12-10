var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};

var UserSession = false;

// globalCurrentUser = {};
// need to create object for user new Object()
User.fetch = function() {
  var self = this;
  var url = "http://127.0.0.1:3000/user";
  var request = $.getJSON(url).then(function(req, res){
    console.log("THIS IS FETCHING THE USER");
    console.log("req: " + req);
    console.log("res: " + res);
    // globalCurrentUser = new User(req);
    return req;
  }).fail(function(res){
    if($('form').attr('action') == '/signup'){
      session.grabSignUpErrors();
    }
    else if($('form').attr('action') == '/login'){
      session.grabLoginErrors();
    }
  });
  console.log("full get request: " + request);
  return request;
};

// User.prototype = {
//   fetchVotes: function(){
//     var user = this;
//     var url = "http://127.0.0.1:3000/currentuser"
//     user.votes = [];
//     var
//   }
// }

User.logOut = function(){
  var self = this;
  var url = "http://127.0.0.1:3000/logout";
  $.getJSON(url, function(response){
    // console.log(response);
  }).then(function(res){
    console.log("LOGOUT!");
    $(".allvotesdiv").empty();
    if(!jQuery.isEmptyObject(userView.currentUser)){
      userView.currentUser = {};
      session.showLogout();
    }
    // userView.toggleLoginDisplays();
    // userView.toggleLogoutDisplays();
  }).fail(function(res){
    console.log("FAILED LOGOUTTTT");
    alert("failure from user post");
  });
};


// explaining options???
User.post = function(){
  // resetting form:
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
    User.fetch();
    // userView.toggleLoginDisplays();
    return res;
  }).fail(function(res){
    console.log(res);
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
    User.fetch();
    // IF its a sucess, hide login displays
    // userView.toggleLoginDisplays();
  }).fail(function(res){
    console("failure from user post to login");
  });
};
