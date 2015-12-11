var MovieView = function(movie) {
  this.movie = movie;
  this.$el = $("<div class='movie movie-style'></div>");
};

MovieView.prototype = {
  render: function(){
    var self = this;
    var timeLeft = moment(self.movie.time).diff(moment(),'minutes');
    var timeClass = timeLeft > 15 ? 'green' : 'red';
    self.$el.append("<span class='movietitle'>" + self.movie.title + ' </span>');
    self.$el.append('<span>' + moment(self.movie.time).format('h:mm A') + '</span>');
    self.$el.append('<a href="' + self.movie.url + '"> @ ' + self.movie.theater + " </a>");
    self.$el.append('<span class="' + timeClass + '">in ' + timeLeft + 'min </span>');
    $('.loc-container').append(self.$el);
  },
};
