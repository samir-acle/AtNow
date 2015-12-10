// code is not DRY, need to refactor methods in this object
var userView = {

  // need function where if upvoted clicked or downvote, object is added to user
  currentUser: {},
  // maybe something that toggles login
  showLogin: function(){
    $(".login").on("click", function(){
      $(".form-names").css("display", "none");
      $("form").toggle();
      $('form').attr('action', '/login');
      $("h2").html("Log In");
      MovieView.toggle();
    });
  },
  showSignup: function(){
    $(".signup").on("click", function(){
      $(".form-names").css("display", "inline");
      $("form").toggle();
      $("h2").html("Sign Up");
      $('form').attr('action', '/signup');
      MovieView.toggle();
    });
  },
  logOut: function(){
    $(".logout").on("click", function(){
      User.logOut();
    });
  },
  submitForm: function(){
    var self = this;
    $("form").submit(function(evt){
      if($('form').attr('action') == '/signup'){
        User.post();
      }
      else{
        User.postLogin();
      }
      console.log("PREVENT EVENT DEFAULT");
      evt.preventDefault();
      self.userVotes();
      $("form").css("display", "none");
    });
  },
  toggleLoginDisplays: function(){
    $(".login").toggle();
    $(".signup").toggle();
  },
  toggleLogoutDisplays: function(){
    $(".logout").toggle();
  },
  userVotes: function(){
    var self = this;
    var user = User.fetch().then(function(user){
      self.currentUser = user;
      console.log(self.currentUser);
    });
  },
  clickAccountInfo: function(){
    var self = this;
    var uservotes = $(".account");
    var allvotesdiv = $(".allvotesdiv");
    uservotes.on("click", function(){
      if(allvotesdiv.children().length > 0){
        $(".allvotesdiv").empty();
        allvotesdiv.toggle();
      }
      else{
        self.allVotesdiv();
      }
      MovieView.toggle();
    });
  },
  allVotesdiv: function(){
    console.log("showing all votes div function call");
    var self = this;
    if(!jQuery.isEmptyObject(self.currentUser)){
      var userDiv = $(".userdiv");
      var email = self.currentUser.local.email;
      var votesTotal = self.currentUser.votes.length;
      var votes = [];
      votes = self.currentUser.votes;
      var sortedVotes = votes.sort(self.sortFunction);
      self.appendUserInformation(votesTotal, email);
      self.addVotesToUserInfo(sortedVotes);
    }
  },
  appendUserInformation: function(votesTotal, email){
    var allvotesdiv = $(".allvotesdiv");
    allvotesdiv.css("display", "inline");
    var showEmail = $("<h3>" + email + "</h3>");
    var showVotes = $("<h4>" + votesTotal +"</h4>");
    allvotesdiv.append(showEmail);
    showEmail.append(showVotes);
    allvotesdiv.append("<h4>Upvotes:</h4>");
  },
  addVotesToUserInfo: function(sortedVotes){
    var allvotesdiv = $(".allvotesdiv");
    for(var i = 0; i < 10; i++){
      if(sortedVotes[i].vote){
        var formattedTime = moment(sortedVotes[i].createdAt).format("MMM Do YYYY");
        // var voteType = sortedVotes[i].vote ? 'upvote' : 'downvote';
        var dates = $("<p>" + formattedTime + " - " + sortedVotes[i].name + "</p>");
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
