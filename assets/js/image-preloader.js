// Preload images to ensure more speed to display (browser caches it)
var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };

            // Use the following callback methods to debug
            // in case of an unexpected behavior.
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

var imageToPreloadArray = []; 
$.each(char, function(characterAttrs) { 
    var currentCharactAttrs = [];
    currentCharactAttrs.push(
        this.firstImageUrl, 
        this.hasBeenKilledByThanosImage,
        this.powerTool.imgUrl
    );
    
    var badMenArray = [];
    $.each(this.badMen, function () {
        badMenArray.push(this.imgUrl);
    });
    currentCharactAttrs.push(badMenArray);
    currentCharactAttrs.push(this.comicsFirstSlideImgs);
    imageToPreloadArray.push(currentCharactAttrs);
});
imageToPreloadArray = imageToPreloadArray.flat(2);
console.log(imageToPreloadArray);

preloadPictures(imageToPreloadArray, function () {});

$('#loader').fadeOut();