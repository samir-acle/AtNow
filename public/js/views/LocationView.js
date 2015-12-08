var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<li class='location'></li>");
//   $(this).append('<input type="button" value="Upvote">').on("click", "button", function(){
//
// });
};

LocationView.prototype = {
  render: function(){
    var self = this;
    self.$el.append("<h3>" + self.loc.name + "</h3>");
    self.$el.append("<h4>" + self.loc.count + "</h4>");
    self.$el.append('<input type="button" value="upvote" class="upvote">');
    self.$el.append('<input type="button" value="downvote" class="downvote">');
    self.click();
    $('.loc-container').append(self.$el);
  },
  click: function(){
    var self = this;
    self.$el.find('h3').on('click', function(){
      console.log(self.loc);
      // self.loc.getVoteCount(self.loc);
    });
    self.$el.find('.upvote').on('click', function(){
      self.loc.postVote(self.loc.id, true);
    });
    self.$el.find('.downvote').on('click', function(){
      self.loc.postVote(self.loc.id, false);
    });
  }
};
