var User = function(info) {
  this.firstname = info.firstname;
  this.lastname = info.lastname;
  this.email = info.email;
  this.password = info.password;
};

User.fetch = function() {
  var request = $.getJSON("http://localhost:3000/")
  .then(function(res){
    var user = new User(response);
    console.log(user);
    return user;
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
  }).then(function(postedUserinfo){
    self.reload(postedUserinfo);
  });
  return request;
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
