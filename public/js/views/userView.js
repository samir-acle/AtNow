// code is not DRY, need to refactor methods in this object
var userView = {
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
        $("form").css("visibility", "hidden");
    });
  },
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
};
