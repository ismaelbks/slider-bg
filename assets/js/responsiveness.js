$( window ).resize(function() {
  SetRailDimension();
});


function SetRailDimension() {
  var totalWidth = 0,
      windowWidth = $('#window').width();
  $.each(slides, function() {
    slides.css('width', windowWidth);
    totalWidth += $(this).width();
  });

  $('#rail').css('width', totalWidth);
  var slideWidth = slides.width();
  var railLeftPosition = slideWidth * -1
  $('#rail').css('left', `${railLeftPosition}px`);

  var slideHeight = $('.slide').height();
  $('#rail').css('height', slideHeight);
};
