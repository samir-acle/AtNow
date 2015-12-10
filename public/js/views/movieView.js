var MovieView = function(movie) {
  this.movie = movie;
  this.$el = $("<div class='movie movie-style'></div>");
};

MovieView.prototype = {
  render: function(){
    console.log('renderin movies');
    var self = this;
    var timeLeft = moment(self.movie.time).diff(moment(),'minutes');
    var timeClass = timeLeft > 20 ? 'green' : 'red';
    self.$el.append('<span class="' + timeClass + '">' + timeLeft + 'min left</span>');
    self.$el.append('<span>' + self.movie.title + ' ' + moment(self.movie.time).format('h:mm A') + '</span>');
    self.$el.append('<a href="' + self.movie.url + '">' + self.movie.theater + "</a>");
    $('.movie-container').append(self.$el);
  },
};

MovieView.toggle = function(){
    $('.movie-container').toggle();
};
