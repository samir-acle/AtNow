var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location loc-style'></div>");
};

LocationView.prototype = {
  render: function(){
    var self = this;
    var upvote = self.loc.userUpvote.toString();
    var downvote = self.loc.userDownvote.toString();

    self.$el.append('<h4 class="inline vote-count">' + self.loc.count + '</h4>');
    self.$el.append('<h3 class="inline loc-name">' + self.loc.name + "</h3>");
    self.$el.append('<span class="upvote glyphicon glyphicon-thumbs-up ' + upvote + '"></span>');
    self.$el.append('<span class="downvote glyphicon glyphicon-thumbs-down ' + downvote + '"></span>');
    self.$el.append('<div class="toggle"></div>');
    self.addInfo();


    self.click();
    $('.loc-container').append(self.$el);
  },
  click: function(){
    var self = this;
    self.$el.find('h3').on('click', function(){
      self.$el.find('.toggle').slideToggle("400");
      });
    self.$el.find('.upvote').on('click', function(){
      if(!jQuery.isEmptyObject(userView.currentUser)){
        self.loc.postVote(true);
      } else {
        var message = 'You must be logged in to vote';
        session.showErrors(message, false);
        window.setTimeout(function(){
          $("form").fadeIn();
          $("form h2").html("Log In");
          $('form').attr('action', '/login');
        }, 1800);
      }
      });
    self.$el.find('.downvote').on('click', function(){
      if(!jQuery.isEmptyObject(userView.currentUser)){
        self.loc.postVote(false);
      } else {
        var message = 'You must be logged in to vote';
        session.showErrors(message, false);
      }
      });
    },

  addInfo: function(){
    var self = this;
    var subDiv = self.$el.find('.toggle');
    subDiv.append("<div class='location-toggle'>" + "<span class='list-items'>Address: </span>" + this.loc.address + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>URL: </span>" + this.loc.url + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Rating: </span>" + this.loc.rating + "</div>");
    subDiv.hide();
  }
};
