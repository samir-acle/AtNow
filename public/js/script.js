$(document).ready(function(){
  Location.fetch().then(function(locations){
    locations.forEach(function(location){
      var view = new LocationView(location);
      console.log(view);
      view.render();
    });
  });
});
