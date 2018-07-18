$("#slideWrapper[swipeActive='on']").on('mousedown touchstart', function ( event ) {
  xDown = event.pageX;
  yDown = event.pageY;
}).on('mouseup touchend',function ( event ) {
  xUp = event.pageX;
  yUp = event.pageY;
  var absoluteY = Math.abs(yDown - yUp),
      absoluteX = Math.abs(xDown - xUp),
      swipeX = xDown - xUp;
  // on invalide un swipe trop 'vertical' et on invalide un swipe trop léger
  if ( ( absoluteY < 50 ) && ( absoluteX > 25 ) ) {
    if ( currentSlide.attr('swipeActive') != 'off' ) {
      HandleDragEventWith( swipeX );
    }
  }
});

function HandleDragEventWith( swipeX ) {
  var navigation = $('.currentSlide').attr('navigation');
  if ( navigation == 'on' ) {
    if ( swipeX > 0)  {
      displayNextSlide();
    } else if ( swipeX < 0 ) {
      displayPreviousSlide();
    }
  }
};

function DragActiveOrNot(currentControl) {
  if ( (currentControl == 'on') && ( $('#slideWrapper').attr('swipeActive') == 'on' ) )  {
    $('#rail').draggable( "enable" );
  } else if ( ( currentControl == 'off') || ( $('#slideWrapper').attr('swipeActive') == 'on' ) ) {
    $('#rail').draggable( "disable" );
    $('#slideWrapper').attr('swipeActive', 'off');
  } 
};
