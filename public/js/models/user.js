var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
  this.id = info.id;
};

User.fetch = function() {
  var request = $.getJSON("http://localhost:3000/")
  .then(function(res){
    var user = new User(response);
    console.log(user);
    return user;
  });
};

User.logOut = function(){
  var self = this;
  var url = "http://localhost:3000/logout";
  $.getJSON(url, function(response){
    console.log(response);
  }).then(function(res){
    alert("LOGOUT!");
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
    alert("sucess user!");
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
