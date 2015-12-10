var MovieView = function(movie) {
  this.movie = movie;
  this.$el = $("<div class='movie movie-style'></div>");
};

MovieView.prototype = {
  render: function(){
    var self = this;
    self.$el.append('<a href="' + self.movie.url + '">' + self.movie.theater + "</a>");
    self.$el.append('<span>' + self.movie.title + ' ' + self.movie.time + '</span>');
    $('.movie-container').append(self.$el);
  }
};
