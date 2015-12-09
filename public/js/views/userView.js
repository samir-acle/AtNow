// code is not DRY, need to refactor methods in this object
var userView = {

// need function where if upvoted clicked or downvote, object is added to user 
  currentUser: {},
// maybe something that toggles login
  showLogin: function(){
    $(".login").on("click", function(){
      $("form").css("display", "inline");
      $(".form-names").css("display", "none");
      $('form').attr('action', '/login');
      $("h2").html("Log In");
      console.log("jquery working");
    });
  },
  showSignup: function(){
    $(".signup").on("click", function(){
      $("form").css("display", "inline");
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
      $("form").css("display", "none");
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
      var userDiv = $(".userdiv");
      var allvotesdiv = $("<div class = 'allvotesdiv'></div>");
      userDiv.append(allvotesdiv);
      var email = self.currentUser.local.email;
      var votesTotal = self.currentUser.votes.length;
      var votes = [];
      votes = self.currentUser.votes;
      var sortedVotes = votes.sort(self.sortFunction);
      self.appendUserInformation(allvotesdiv, votesTotal, email);
      self.addVotesToUserInfo(sortedVotes, allvotesdiv);
    }
  },
  appendUserInformation: function(allvotesdiv, votesTotal, email){
    var showEmail = $("<h3>" + email + "</h3>");
    var showVotes = $("<h4>" + votesTotal +"</h4>");
    allvotesdiv.append(showEmail);
    showEmail.append(showVotes);
    allvotesdiv.append("<h4>UpVotes:</h4>");
  },
  addVotesToUserInfo: function(sortedVotes, allvotesdiv){
    for(var i = 0; i < 10; i++){
      if(sortedVotes[i].vote){
        var dates = $("<p>" + sortedVotes[i].createdAt + ", " + sortedVotes[i].location_id + "</p>");
        allvotesdiv.append(dates);
      }
    }
  },
  sortFunction: function(a,b){
      var dateA = new Date(a.createdAt).getTime();
      var dateB = new Date(b.createdAt).getTime();
      return dateA < dateB ? 1 : -1;
    },
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
