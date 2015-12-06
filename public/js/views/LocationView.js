var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<li class='location'></li>");
};

LocationView.prototype = {
  render: function(){
    var self = this;
    self.$el.append("<h3>" + self.loc.name + "</h3>");
    self.click();
    $('.loc-container').append(self.$el);
  },
  click: function(){
    var self = this;
    self.$el.on('click', function(){
      console.log(self.loc);
    });
  }
};
