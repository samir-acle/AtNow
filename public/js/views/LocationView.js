var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location loc-style'></div>");
};

LocationView.prototype = {
  render: function(){
    var self = this;
    var upvote = self.loc.userUpvote.toString();
    var downvote = self.loc.userDownvote.toString();

    self.$el.append("<h3>" + self.loc.name + "</h3>");
    self.$el.append("<h4>" + self.loc.count + "</h4>");
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
      if(!jQuery.isEmptyObject(currentUser)){
        self.loc.postVote(true);
      }
      });
    self.$el.find('.downvote').on('click', function(){
      if(!jQuery.isEmptyObject(currentUser)){
        self.loc.postVote(false);
      }
      });
    },

  addInfo: function(){
    var self = this;
    var subDiv = self.$el.find('.toggle');
    // subDiv.append('<div><img src="' + this.loc.icon + '" height="32px" width="32px"></div>');
    subDiv.append("<div class='location-toggle'>" + "<span class='list-items'>Address: </span>" + this.loc.address + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Types: </span>" + this.loc.types + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Rating: </span>" + this.loc.rating + "</div>");
    subDiv.hide();
  }
};
