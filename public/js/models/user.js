var User = function(info) {
  // this.firstname = info.firstname;
  // this.firstname = info.firstname;
  this.email = info.local.email;
};

User.fetch = function() {
  var url = "http://localhost:3000/user/";
  $.getJSON(url).then(function(res){
    console.log(res);
    var currentUser = new User(res);
    session.currentUser = currentUser;
  });
};

// User.setCurrentUser = function(){
//   User.currentUser =
// };
