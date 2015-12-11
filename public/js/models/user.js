var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};

var currentUser = {};

// globalCurrentUser = {};
// need to create object for user new Object()

User.fetch = function() {
  var self = this;
  var url = "http://127.0.0.1:3000/user";
  var request = $.getJSON(url).then(function(req, res){
    currentUser = req;
    return req;
  }).fail(function(res){
    if(jQuery.isEmptyObject(currentUser)){
      session.grabSignUpErrors();
    }
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
  }).then(function(res, req){
    currentUser = res;
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
    console.log("User login" + res);
    currentUser = res;
    session.showLoginSucess();
    session.reload();
    // IF its a sucess, hide login displays
    // userView.toggleLoginDisplays();
  });
};
