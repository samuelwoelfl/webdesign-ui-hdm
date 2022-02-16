// set speed => metric is how many elements should be scrolled per click if all have the same size
let speed = 1.5;
// set if you want autoscroll and if so how many seconds should be between each scroll
let autoScroll = false;
let autoScrollSeconds = 5;

// other variables for global scope
let recTranslate = 0;
let carouselList, widthToScroll, translateIncrem, autoScrollInterval;

// window on load since we need to wait till the images are loaded here
$(window).on("load", function() {

  prevButton = $(".carousel-prev-rec");
  nextButton = $(".carousel-next-rec");

  carouselList = $(".carousel-list");
  listItems = $(".carousel-listitem");
  itemsCount = listItems.length;

  let itemsFullWidth = 0;
  $.each(listItems, function(i, item) {
    itemsFullWidth += $(item).outerWidth(true);
  });

  let visibleWidth = $('.carousel-body').outerWidth(true);
  widthToScroll = Math.round(itemsFullWidth - visibleWidth);
  let targetIncrem = (itemsFullWidth / itemsCount) * speed;
  let increments = Math.round(widthToScroll / targetIncrem);
  // console.log(increments);
  translateIncrem = (widthToScroll / increments);
  // console.log(translateIncrem);


  prevButton.click(function() {
    if (recTranslate < 0) {
      recTranslate += translateIncrem;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
    } else {
      recTranslate = widthToScroll * -1;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
    }
    pauseAutoScroll(5000);
  });

  nextButton.click(function() {
    if (recTranslate > (widthToScroll * -1)) {
      recTranslate -= translateIncrem;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
    } else {
      recTranslate = 0;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
    }
    pauseAutoScroll(5000);
  });

  activateAutoScroll(autoScroll, autoScrollSeconds);
});


function activateAutoScroll(activated, time) {
  if (activated) {
    console.log(autoScrollInterval);
    autoScrollInterval = setInterval(function() {
      if (recTranslate > (widthToScroll * -1)) {
        recTranslate -= translateIncrem;
        carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
      } else {
        recTranslate = 0;
        carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
      }
    }, time * 1000);
    console.log(autoScrollInterval);
    console.log(typeof(autoScrollInterval));
  }
}

function pauseAutoScroll(pauseTime) {
  // FIXME: shoulnd't create multiple intervals when running during a pause
  console.log(autoScrollInterval);
  clearInterval(autoScrollInterval);
  console.log(autoScrollInterval);
  setTimeout(function() {
    activateAutoScroll(autoScroll, autoScrollSeconds);
  }, pauseTime);
}