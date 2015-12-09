// code is not DRY, need to refactor methods in this object
var userView = {

  currentUser: {},

  showLogin: function(){
    $(".login").on("click", function(){
      $("form").css("visibility", "visible");
      $(".form-names").css("display", "none");
      $('form').attr('action', '/login');
      $("h2").html("Log In");
      console.log("jquery working");
    });
  },
  showSignup: function(){
    $(".signup").on("click", function(){
      $("form").css("visibility", "visible");
      $(".form-names").css("display", "inline");
      $("h2").html("Sign Up");
      $('form').attr('action', '/signup');
    });
  },
  logOut: function(){
    $(".logout").on("click", function(){
      User.logOut();
      console.log("logout jquery working");
    });
  },
  submitForm: function(){
    $("form").submit(function(evt){
      if($('form').attr('action') == '/signup'){
        User.post();
      }
      else{
        User.postLogin();
      }
      console.log("PREVENT EVENT DEFAULT");
      evt.preventDefault();
      userView.userVotes();
      $("form").css("visibility", "hidden");
    });
  },
  userVotes: function(){
    var self = this;
    var uservotes = $("<button class='uservotes'>See All Votes</button>");
    console.log(uservotes);
    $(".userdiv").append(uservotes);
    uservotes.on("click", function(){
      var user = User.fetch().then(function(user){
        self.currentUser = user;
        console.log(self.currentUser);
        userView.allVotesdiv();
      });
    });
  },
  allVotesdiv: function(){
    var self = this;
    if(!jQuery.isEmptyObject(self.currentUser)){
      // var allvotesdiv = $("<div class = 'allvotesdiv'></div>");
      var userDiv = $(".userdiv");
      // $(".userdiv").append(allvotesdiv);
      console.log("This is the all votes div");
      var email = self.currentUser.local.email;
      var votesTotal = self.currentUser.votes.length;
      var showEmail = $("<h2>" + email + "</h2>");
      var showVotes = $("<h3>" + votesTotal +"</h3>");
      userDiv.append(showEmail);
      showEmail.append(showVotes);
    }
  }
};



// we can use something like this to check if fields have value:
// checkIfValid: function(){
//   var formDivs = $(".form-group input");
//   for(var i = 0; i < formDivs.length; i++){
//
//     if(!formDivs.eq(i).val()){
//       console.log("Your missing a field");
//       return false;
//     }
//     else{
//       console.log("true");
//       return true;
//     }
//   }
// }
