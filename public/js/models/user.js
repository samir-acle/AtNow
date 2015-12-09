var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};


User.fetch = function() {
  var self = this;
  var url = "http://localhost:3000/user";
  var request = $.getJSON(url).then(function(req, res){
    console.log(req.local.email);
    console.log("THIS IS FETCHING THE USER and response!!! " + res + "ANNNND" + req);
    return req;
  }).fail(function(response){
    console.log("JS FAILED TO GET USER");
  });
  console.log(request);
  return request;
};

Location.prototype.getVoteCount = function(){
  var self = this; //cahnge back to id
  var request = $.ajax({
    url: "http://localhost:3000/locations/" + self.id,
    type: "GET",
    dataType: "json"
  }).then(function(res){
    console.log('res',res);
    return res;
  }).fail(function(){
    alert('FAILRUE');
  });

  return request;
};

// User.prototype = {
//   fetchVotes: function(){
//     var user = this;
//     var url = "http://localhost:3000/currentuser"
//     user.votes = [];
//     var
//   }
// }

User.logOut = function(){
  var self = this;
  var url = "http://localhost:3000/logout";
  $.getJSON(url, function(response){
    console.log(response);
  }).then(function(res){
    console.log("LOGOUT!");
  }).fail(function(res){
    console.log("FAILED LOGOUTTTT");
    alert("failure from user post");
  });
};


// explaining options???
User.post = function(){
  var self = this;
  var url = "http://localhost:3000/signup";
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
    console.log("sucess user!");
  }).fail(function(res){
    console.log(res);
    alert("failure from user post");
  });
};

User.postLogin = function(){
  var self = this;
  var url = "http://localhost:3000/login";
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
    alert("sucess user!");
  }).fail(function(res){
    console.log(res);
    alert("failure from user post");
  });
};
