function displayNextSlide () {
  progressBar.addClass('progress-bar-striped progress-bar-animated');
  var slideWidth = slides.width();
  btnNext.attr('disabled', 'disabled');
  DragActiveOrNot('off');
  rail.animate(
    { // CSS
      left: `-${2 * slideWidth}px`
    },
    // Duration
    600,
    // Complete callback
    endNextSlide
  );
  function endNextSlide () {
    var slideWidth = slides.width();
    $('.slide:last').after($('.slide:first'));
    rail.css('left', `+=${slideWidth}`);
    btnNext.removeAttr('disabled');
    UpdateSlideClasses();
    DragActiveOrNot('on');
  }
};


function displayPreviousSlide () {
  btnPrev.attr('disabled', 'disabled');
  DragActiveOrNot('off');
  rail.animate(
    { // CSS
      left:'0px'
    },
    // Duration
    600,
    // Complete callback
    endPreviousSlide
  );
  function endPreviousSlide () {
    PutOneSlideBeforeFirst();
    btnPrev.removeAttr('disabled', 'disabled');
    UpdateSlideClasses();
    DragActiveOrNot('on');
  };
};

function PutOneSlideBeforeFirst() {
  var slideWidth = slides.width();
  rail.css('left', -slideWidth);
  $('.slide:first').before($('.slide:last'));
};

function AddIdToEachSlide() {
  var index = 1;
  $.each( slides, function ( slide ) {
    $(this).attr('data-position', index);
    index++;
  });
};

function LaunchAutoPlay() {
  var autoPlayButton = $('button#launchAutoPlay'),
      autoPlayStatus = autoPlayButton.attr('value');

  if ( autoPlayStatus == 'off' ) {
    intervalID = window.setInterval('displayNextSlide()', 3000);
    autoPlayButton.attr('value', 'on');
    autoPlayButton.find('i').removeClass('fa-play-circle');
    autoPlayButton.find('i').addClass('fa-pause-circle');
  } else if ( autoPlayStatus == 'on' ) {
    clearInterval(intervalID);
    autoPlayButton.attr('value', 'off');
    autoPlayButton.find('i').removeClass('fa-pause-circle');
    autoPlayButton.find('i').addClass('fa-play-circle');
  }
};
