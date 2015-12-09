var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location loc-style'></div>");
};

LocationView.prototype = {
  render: function(){
    var self = this;

    var showLocations = self.$el.find("");
    var locationsDiv = self.$el.find("div.location");

    this.$el.on("click", function(){
      console.log(locationsDiv.children());
    if(self.$el.find('.test').children(':visible').length === 0){
        self.toggleLocations(locationsDiv);
      }
      else {
        console.log("click consoleloggylog");
        self.toggleLocations.hide(locationsDiv);
      }
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
  //  toggleDiv: function(locationsDiv){
  //    console.log("test");
  //    if(this.$el.is(":visible")){
  //      console.log("Hide/Show");
  //      ("#hide").locationsDiv.children("div.location");
  //    } else {
  //      console.log("second statement");
  //      ("#show").locationsDiv.children("div.location");
  //    }
  //  },
  toggleLocations: function(locationsDiv){
    console.log("Locations Div on Click");
    // self.appendLocations(locationsDiv);
    var self = this;
        console.log("children-test");
        var subDiv = $('<div class="test"></div>');
        subDiv.append('<div><img src="' + this.loc.icon + '" height="32px" width="32px"></div>');
        subDiv.append("<div class='location-toggle'>" + "<span class='list-items'>Address: </span>" + this.loc.address + "</div>");
        subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Types: </span>" + this.loc.types + "</div>");
        subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Rating: </span>" + this.loc.rating + "</div>");
        this.$el.append(subDiv);
    console.log("sup bruh");
    this.$el.find('.test').toggle();
    // this.toggleDiv(locationsDiv);
  },
  // appendLocations: function(locationsDiv){
  //   var self = this;
  //   if(locationsDiv.children().length === 0){
  //       this.$el.append('<div><img src="' + this.loc.icon + '" height="32px" width="32px"></div>');
  //       this.$el.append("<div class='location-toggle'>" + "<span class='list-items'>Address: </span>" + this.loc.address + "</div>");
  //       this.$el.append("<div class='location-toggle'>"  + "<span class='list-items'>Types: </span>" + this.loc.types + "</div>");
  //       this.$el.append("<div class='location-toggle'>"  + "<span class='list-items'>Rating: </span>" + this.loc.rating + "</div>");
  //   }
  //   this.$el.toggle();
  // this.toggleDiv(locationsDiv);
  // }
};
