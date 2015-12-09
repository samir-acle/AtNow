
var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location loc-style'></div>");
//   $(this).append('<input type="button" value="Upvote">').on("click", "button", function(){
//
// });
};

LocationView.prototype = {
  render: function(){
    var self = this;

    var showLocations = self.$el.find("");
    var locationsDiv = self.$el.find("div.location");

    this.$el.on("click", function(){
      console.log("setup click on click");
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
   toggleDiv: function(locationsDiv){
     console.log("test");
     if(this.$el.is(":visible")){
       console.log("Hide/Show");
       locationsDiv.siblings("div.location").text("Hide Details");
     } else {
       console.log("second statement");
       locationsDiv.siblings("div.location").text("Show Details");
     }
   },
  toggleLocations: function(locationsDiv){
    console.log("Locations Div on Click");
    // var self = this;
    if(locationsDiv.children().length === 0){
      // this.Location.fetch().then(function(locations){
        this.$el.append("<div>" + this.loc.icon + "</div>");
        this.$el.append("<div>" + this.loc.address + "</div>");
        this.$el.append("<div>" + this.loc.types + "</div>");
        this.$el.append("<div>" + this.loc.rating + "</div>");
      // });
    }
    locationsDiv.toggle();
    this.toggleDiv(locationsDiv);
        // $('.loc-container').append(self.$el);
  },
  // appendLocations: function(locations, locationsDiv){
  // locations.forEach(function(location){
  //   var toggleLocationView = new toggleLocationView(location);
  //   locationsDiv.append(toggleLocationView.render());
  // });
// },
};
