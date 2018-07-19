var characters = $('.persoChoiceWrapper'),
    chosenCharacter = null,
    chosenCharacterId = '',
    valideChoiceAlert = $('#valideChoiceAlert'),
    characterAttributes,
    characterCaract;

characters.click(function () {
  invalidateAllChoices();
  if ( chosenCharacterId == $(this).attr('id') ) {
    chosenCharacter = null;
    chosenCharacterId = '';
  } else {
    chosenCharacter = $(this);
    $('#firstSection').addClass('hasSelected');
    chosenCharacter.attr('char-selected', 'On');
    chosenCharacter.find('h2').after('<i class="far fa-check-circle"></i>');
    chosenCharacterId = chosenCharacter.attr('id');
    characterAttributes = char[chosenCharacterId];
    characterCaract = characterAttributes.caracteristics;
    valideChoiceAlert.fadeIn();
  }
});

function resetGame () {
  invalidateAllChoices();
  chosenCharacter = null;
  chosenCharacterId = '';
  $('#firstSection').removeClass('hasSelected');
  characterAttributes = '';
  characterCaract = '';
  $('html, body').removeClass('noScroll');
  $('#firstSection').show();
  $('body').css('background',  'url("assets/img/doomsday-bg-3.jpg")');
  $('html, body').animate( { scrollTop: 0 }, 1250 ); // Go
  $('#secondSection').hide();
  resetAllSlide();
};

function invalidateAllChoices () {
  $('#firstSection').removeClass('hasSelected');
  $.each(characters, function () {
    $(this).find('.persoTitleWrapper i').remove();
    $(this).attr('char-selected', 'Off');
  });
  valideChoiceAlert.fadeOut();
};

$('#valideChoiceAlert #validate').on('click', goToSlideShow);

function goToSlideShow () {
  resetFirstSlide();
  $('body').css('background',  `url('${characterAttributes.backgroundUrl}')`);
  var page = '#secondSection'; // Page cible
  var speed = 750; // Durée de l'animation (en ms)
  $('#secondSection').fadeIn();
  SetRailDimension();
  $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
  setTimeout(function(){
    $('#firstSection').hide();
  }, 1000);
  $('html, body').addClass('noScroll');
  CallBackHandler();
}

function resetFirstSlide() {
  var progressStrength = $('.strengthProgress'),
      progressSpeed = $('.speedProgress'),
      progressSmartness = $('.smartnessProgress'),
      healthProgress = $('.healthProgress');
      
    
  $('#charactertics').hide();    
  progressStrength.css('width', '00%');
  progressSpeed.css('width', '00%'); 
  progressSmartness.css('width', '00%');
  healthProgress.css('width', '00%');
  var persoWrappers = $('.persoWrapper');
  persoWrappers.empty();
};

function firstSlide () {
  $('body').css('background',  `url('${characterAttributes.backgroundUrl}')`);
  var persoWrappers = $('.persoWrapper'),
      characterImg  = chosenCharacter.find('img').clone(),
      characterName = chosenCharacter.find('h2').clone();
  persoWrappers.empty();

  characterImg.css('display', 'none');
  characterName.css('display', 'none');

  $.each(persoWrappers, function (){
    
    $(this).html(characterImg);
    characterImg.after(characterName);
  });

  setTimeout(function(){
    characterImg.toggle( "slide" );
    characterName.toggle( "slide" );
    $('#charactertics').fadeIn();
    updateProgressBar();
  }, 1200);
  
  function updateProgressBar () {
    var progressStrength = $('.strengthProgress'),
        progressSpeed = $('.speedProgress'),
        progressSmartness = $('.smartnessProgress'),
        healthProgress = $('.healthProgress');
        
    progressStrength.css('width', '00%');
    progressSpeed.css('width', '00%'); 
    progressSmartness.css('width', '00%');
    healthProgress.css('width', '00%');

    progressStrength.css('width', `${characterCaract.strength}%`);
    progressSpeed.css('width', `${characterCaract.speed}%`);
    progressSmartness.css('width', `${characterCaract.smartness}%`);
    healthProgress.css('width', `${characterCaract.health}%`);
  };
  //
};

function resetSecondSlide () {
  var storyParagraph = $('#charactStory');
  storyParagraph.empty();
  storyParagraph.hide();
};

function secondSlide () {
  $('body').css('background',  `url('${characterAttributes.backgroundUrl}')`);
  var storyParagraph = $('#charactStory');
  storyParagraph.text(characterAttributes.story);
  storyParagraph.fadeIn();
};

function resetThirdSlide() {
  var deathByThanosImg = $('#killedByThanosImg'),
    killedByThanosWaiter = $('#killedByThanosWaiter'),
    killedByThanosParag = $('#killedByThanosParag');
  deathByThanosImg.hide();
  killedByThanosWaiter.hide();
  killedByThanosParag.hide();
};

function thirdSlide () {
  $('body').css('background',  '#000000');
  var deathByThanosImg = $('#killedByThanosImg'),
      killedByThanosWaiter = $('#killedByThanosWaiter'),
      killedByThanosParag = $('#killedByThanosParag');
  killedByThanosParag.empty();
      
  deathByThanosImg.attr('src', characterAttributes.hasBeenKilledByThanosImage);
  killedByThanosParag.html(characterAttributes.hasBeenKilledByThanosSentence);
  killedByThanosWaiter.fadeOut(2000, function () {
    deathByThanosImg.fadeIn(function () {
      killedByThanosParag.fadeIn();
    });
  });
  resetSecondSlide();
};

function fourthSlide () {
  $('body').css('background',  '#000000');
  var comicFirstSlideWrapper = $('#comicFirstSlideWrapper'),
      divTags = ['<div class="col-md-4">', '</div>'];
  comicFirstSlideWrapper.hide();    
  comicFirstSlideWrapper.empty();
  
  characterAttributes.comicsFirstSlideImgs.forEach(function (imgUrl) {
    var imgTag = `<img src="${imgUrl}" alt="" class="img-fluid">`
        comicDiv = [divTags[0], imgTag, divTags[1] ].join('\n');
    comicFirstSlideWrapper.append(comicDiv);
  });
  comicFirstSlideWrapper.fadeIn(500);
}

function resetFourthSlide () {
    var comicFirstSlideWrapper = $('#comicFirstSlideWrapper'),
        divTags = ['<div class="col-md-4">', '</div>'];
    comicFirstSlideWrapper.empty();
};


function fifthSlide () {
  $('body').css('background',  '#000000');
  var badMen = characterAttributes.badMen;
      badMenWrapper = $('#badMenWrapper'),
      divTags = ['<div class="badMenWrapper col-md-4 col-sm-6 mb-3 mb-md-1">', '</div>'];
      badMenWrapper.hide();
      badMenWrapper.empty();
  
  badMen.forEach(function(badMan) {
    var badManImgUrl = badMan.imgUrl,
        badManName =  badMan.name,
        badManStory = badMan.story,
        badManImgHtml = `<img src="${badManImgUrl}" alt="${badManName}" class="img-fluid">`,
        htmlTitle = `<h3 class="text-center">${badManName}</h3>`,
        htmlContent = [ divTags[0], badManImgHtml, htmlTitle, badManStory, divTags[1] ].join('\n');
        
    badMenWrapper.append(htmlContent);
    badMenWrapper.fadeIn(400);
  });
};

function resetFifthSlide() {
  var badMenWrapper = $('#badMenWrapper');
  badMenWrapper.empty();
};

function sixthSlide () {
  $('body').css('background',  '#000000');
  var powerImg =         $('#powerTool img#powerImg'),
      powerTitle =       $('#powerTool #powerTitle'),
      powerDescription = $('#powerTool #powerDescription');
      
  powerImg.removeAttr('src').hide();
  powerDescription.empty().hide();
  
  powerTitle.empty().html(characterAttributes.powerTool.title);
  powerImg.attr('src', characterAttributes.powerTool.imgUrl);
  powerDescription.html(characterAttributes.powerTool.description);
  
  powerTitle.fadeIn(700, function () {
    powerImg.fadeIn(900, function () {
      powerDescription.fadeIn(700);
    });
  });
};

function resetSixthSlide () {
    var powerImg =         $('#powerTool img#powerImg'),
      powerTitle =       $('#powerTool #powerTitle'),
      powerDescription = $('#powerTool #powerDescription');
    powerTitle.hide();
    powerImg.removeAttr('src').hide();
    powerDescription.empty().hide();
};

function seventhSlide() {
  $('body').css('background',  '#000000');
  var iframeSrc = $('#videoFrame');
  iframeSrc.attr('src', characterAttributes.videoUrl += '&autoplay=1' );
};

function resetSeventhSlide() {
  var iframeSrc = $('#videoFrame');
  iframeSrc.attr('src', '');
};

// function needed to sort div by position
function getSorted(selector, attrName) {
    return $($(selector).toArray().sort(function(a, b){
        var aVal = parseInt(a.getAttribute(attrName)),
            bVal = parseInt(b.getAttribute(attrName));
        return aVal - bVal;
    }));
}

function resetAllSlide () {
  resetFirstSlide();
  resetSecondSlide();
  resetThirdSlide();
  resetFourthSlide();
  resetFifthSlide();
  resetSixthSlide();
  resetSeventhSlide();
};