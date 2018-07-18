var progressBar = $('#progressBarWrapper .progress-bar'),
    slidesCount = $('.slide').length;

function UpdateValueOfProgressBar () {
  var completion = Math.floor( (currentSlide.attr('data-position') / slidesCount) * 100),
      completionWithPercent = `${completion}%`;
  progressBar.css('width', `${completion}%`);
  progressBar.attr('aria-valuenow', completion);
  progressBar.removeClass('progress-bar-striped progress-bar-animated');
}
