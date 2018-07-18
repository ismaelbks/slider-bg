function RemoveNavigationButtonWith ( currentControl ) {
  if ( currentControl == 'off' ) {
    btnPrev.attr('disabled', 'disabled');
    btnNext.attr('disabled', 'disabled');
  } else if ( currentControl == 'on' ) {
    btnPrev.removeAttr('disabled');
    btnNext.removeAttr('disabled');
  }
};

function UpdateSlideClasses () {
  $('.slide').removeClass('previousSlide currentSlide nextSlide');
  previousSlide = $('.slide:first');
  currentSlide = $('.slide:nth-child(2)');
  currentControl = currentSlide.attr('navigation');
  nextSlide = $('.slide:nth-child(3)');
  
  SetSlideClass();
  RemoveNavigationButtonWith(currentControl);
  UpdateValueOfProgressBar();
  CallBackHandler();
  ArrowAreBlocked = false;
};

function SetSlideClass () {
  previousSlide.addClass('previousSlide');
  currentSlide.addClass('currentSlide');
  nextSlide.addClass('nextSlide');
  currentPosition = parseInt(currentSlide.attr('data-position'));
};

function CallBackHandler () {
  switch(currentPosition) {
    case 1:
        firstSlide();
        break;
    case 2:
        displayCharacterStory()
        break;
    case 3:
        thirdSlide();
        break;
    case 4:
        fourthSlide();
        break;
    case 5:
        fifthSlide();
        break;
    case 6:
        sixthSlide();
        break;
    case 7:
        seventhSlide();
        break;
    default:
        console.log(currentPosition);
  }
};

var ArrowAreBlocked = false;
$(document).keydown(function(e) {
  if (  chosenCharacterId && !ArrowAreBlocked  ) {
    switch(e.which) {
      case 37: // left
      displayPreviousSlide();
      ArrowAreBlocked = true;
      break;

      case 39: // right
      displayNextSlide();
      ArrowAreBlocked = true;
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
});

      
