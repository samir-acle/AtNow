$(document).ready(function($){

  var animationDelay = 2500;
  var cta = $('.cta');
  $('b').eq(0).addClass('is-visible');

  animateHeadline($('.cta'));

  function animateHeadline($headlines) {
  	$headlines.each(function(){
  		var headline = $(this);
      console.log(headline);
  		//trigger animation
  		setTimeout(function(){
        hideWord( headline.find('.is-visible') );
     },
      animationDelay);
  	});
  }

  function hideWord($word) {
  	var nextWord = takeNext($word);
  	switchWord($word, nextWord);
  	setTimeout(function(){ hideWord(nextWord);
     },
     animationDelay);
  }

  function takeNext($word) {
  	return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  function switchWord($oldWord, $newWord) {
  	$oldWord.removeClass('is-visible').addClass('is-hidden');
  	$newWord.removeClass('is-hidden').addClass('is-visible');
  }
});
