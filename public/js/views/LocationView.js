
var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location'></div>");
//   $(this).append('<input type="button" value="Upvote">').on("click", "button", function(){
//
// });
};

LocationView.prototype = {
  render: function(){
    var self = this;

    var showLocations = self.$el.find(".showLocations");
    var locationsDiv = self.$el.find("div.location");


    showLocations.on("click", function(){
      console.log("setup click");
        self.toggleLocations(locationsDiv);
      });

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
       });
       self.$el.find('.upvote').on('click', function(){
         self.loc.postVote(true);
       });
       self.$el.find('.downvote').on('click', function(){
         self.loc.postVote(self.loc.id, false);
       });
     },
  toggleLocations: function(locationsDiv){
    console.log("test");
    var self = this;
    if(locationDiv.children().length === 0){
      this.Location.fetch().then(function(locations){
        self.$el.append("<div>" + this.loc.icon + "</div>");
        self.$el.append("<div>" + this.loc.address + "</div>");
        self.$el.append("<div>" + this.loc.types + "</div>");
        self.$el.append("<div>" + this.loc.rating + "</div>");
      });
    }
    locationsDiv.toggle();
    this.toggleDiv(locationsDiv);
  }
};
