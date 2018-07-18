var slides = $('#rail').children('.slide'),
    rail = $('#rail'),
    currentPosition = 1,
    intervalID = null;

SetRailDimension();

var btnNext = $('#btnNext'),
    btnPrev = $('#btnPrevious'),
    currentSlide = $('.slide:nth-child(1)'),
    previousSlide = $('.slide:last-child'),
    nextSlide = $('.slide:nth-child(2)'),
    currentControl = currentSlide.attr('navigation');

if ( $('#slideWrapper').attr('swipeActive') == 'on' ) {
  rail.draggable({
    axis: 'x'
  });
}

$('[data-toggle="tooltip"]').tooltip();


PutOneSlideBeforeFirst();
AddIdToEachSlide();
SetSlideClass();
DragActiveOrNot();
UpdateValueOfProgressBar();
