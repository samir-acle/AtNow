var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<li class='location'></li>");
};

LocationView.prototype = {
  render: function(){
    var self = this;
    self.$el.append("<h3>" + self.loc.name + "</h3>");
    $('.loc-container').append(self.$el);
  }
};
