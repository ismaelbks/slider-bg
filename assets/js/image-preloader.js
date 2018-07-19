
// Custom fonction to flattened an array (original one is badly supported on browsers)
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

// Create an array on every images used in character-attributes.js
var imageToPreloadArray = []; 
$.each(char, function(characterAttrs) { 
    var currentCharactAttrs = [];
    currentCharactAttrs.push(
        this.firstImageUrl, 
        this.hasBeenKilledByThanosImage,
        this.powerTool.imgUrl,
        this.backgroundUrl
    );
    
    var badMenArray = [];
    $.each(this.badMen, function () {
        badMenArray.push(this.imgUrl);
    });
    currentCharactAttrs.push(badMenArray);
    currentCharactAttrs.push(this.comicsFirstSlideImgs);
    imageToPreloadArray.push(currentCharactAttrs);
});
imageToPreloadArray = imageToPreloadArray.flat(2); // concat in one array

// Preload images to ensure more speed to display (browser caches it)
function insertPictureInDom () {
    var imageDomWrapper = document.getElementById('imageDomWrapper');
    
    imageToPreloadArray.forEach(function(image_url) {
       var imageHtmlNode = $(imageDomWrapper).append(`<img src="${image_url}">`);
    });
    
    $(window).on('load', function() {
        $(imageDomWrapper).remove();
        $('#loader').fadeOut();
    });
};

insertPictureInDom();