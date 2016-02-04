var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};

User.fetch = function() {
  var self = this;
  var url = "http://127.0.0.1:3000/user";
  var request = $.getJSON(url).then(function(user,res){
    userView.currentUser = user;
    return user;
  }).fail(function(res){
    var message = res.message;
    var type = message.success;
    session.showErrors(message, type);
  });
  return request;
};

User.logOut = function(){
  var self = this;
  var url = "http://127.0.0.1:3000/logout";
  $.getJSON(url, function(response){
  }).then(function(res){
    console.log("LOGOUT!");
    if(!jQuery.isEmptyObject(userView.currentUser)){
      userView.currentUser = {};
      session.showLogout();
    }
    session.reload();
  }).fail(function(res){
    console.log("FAILED LOGOUTTTT");
  });
};

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
    return res;
  }).fail(function(res){
    console.log("failure from user post");
  });
};

User.postLogin = function(){
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
    var sessionmessage = res;
    var message = sessionmessage.message;
    var type = sessionmessage.success;
    session.showErrors(message, type);
    session.reload();
  }).fail(function(){
    console.log('failed form post');
  });
};
