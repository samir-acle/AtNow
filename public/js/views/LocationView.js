var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<li class='location'></li>");
};

LocationView.prototype = {
  render: function(){
    var self = this;
    self.$el.append("<h3>" + self.loc.name + "</h3>");
    self.$el.append("<p>" + self.loc.hoursToday + "</p>");
    $('.loc-container').append(self.$el);
  }
};
