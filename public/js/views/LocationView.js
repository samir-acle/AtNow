var LocationView = function(location) {
  this.loc = location;
  this.$el = $("<div class='location loc-style'></div>");
};

LocationView.prototype = {
  render: function(){
    var self = this;

    self.$el.append("<h3>" + self.loc.name + "</h3>");
    self.$el.append("<h4>" + self.loc.count + "</h4>");
    self.$el.append('<span class="upvote glyphicon glyphicon-thumbs-up"></span>');
    self.$el.append('<span class="downvote glyphicon glyphicon-thumbs-down"></span>');
    self.$el.append('<div class="toggle"></div>');
    self.addInfo();


    self.click();
    console.log('appending', self.loc);
    $('.loc-container').append(self.$el);
  },
  click: function(){
    var self = this;
    self.$el.find('h3').on('click', function(){
      self.$el.find('.toggle').slideToggle("400");
      });
    self.$el.find('.upvote').on('click', function(){
      self.loc.postVote(true);
      });
    self.$el.find('.downvote').on('click', function(){
      self.loc.postVote(false);
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
  addInfo: function(){
    var self = this;
    var subDiv = self.$el.find('.toggle');
    // subDiv.append('<div><img src="' + this.loc.icon + '" height="32px" width="32px"></div>');
    subDiv.append("<div class='location-toggle'>" + "<span class='list-items'>Address: </span>" + this.loc.address + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Types: </span>" + this.loc.types + "</div>");
    subDiv.append("<div class='location-toggle'>"  + "<span class='list-items'>Rating: </span>" + this.loc.rating + "</div>");
    subDiv.hide();
  }


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
