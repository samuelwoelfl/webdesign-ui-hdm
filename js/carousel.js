// set speed => metric is how many elements should be scrolled per click if all have the same size
let speed = 1.5;
// set if you want autoscroll and if so how many seconds should be between each scroll
let autoScroll = false;
let autoScrollSeconds = 5;

// other variables for global scope
let recTranslate = 0;
let $carouselList, widthToScroll, translateIncrem, autoScrollInterval;

// window on load since we need to wait till the images are loaded here
$(window).on('load', function() {

  // get elements from html
  $prevButton = $('.carousel-prev-rec');
  $nextButton = $('.carousel-next-rec');
  $carouselList = $('.carousel-list');
  $listItems = $('.carousel-listitem');
  // count how many items are in list
  itemsCount = $listItems.length;

  // calculate full width of all items in sum;
  let itemsFullWidth = 0;
  $.each($listItems, function(i, item) {
    itemsFullWidth += $(item).outerWidth(true);
  });

  // check how much is visible for the user
  let visibleWidth = $('.carousel-body').outerWidth(true);
  // calculate how far it is to navigate to the end
  widthToScroll = Math.round(itemsFullWidth - visibleWidth);
  // calculate the desired increment for each slide based on the defined speed
  let targetIncrem = (itemsFullWidth / itemsCount) * speed;
  // calculate how many increments neet to be done and round it so it will always stops right at the end and not some pixels before or after
  let increments = Math.round(widthToScroll / targetIncrem);
  // calculate how much one increment should be based on the calculations made before
  translateIncrem = (widthToScroll / increments);

  // event handler that checks if the "previous"-button get's clicked
  $prevButton.click(function() {
    // if the position right now is not at the beginning (0 is totally left and then it goes into the minus range depending on how far it is to the right)
    if (recTranslate < 0) {
      // add one increment to the recTranslate value to take it to the left
      recTranslate += translateIncrem;
      // apply the new recTranslate
      applyTranslation();
    } else {
      // if the carousel is at the beginning it will jump to the end
      recTranslate = widthToScroll * -1;
      applyTranslation();
    }
    // pause auto scroll for 5s if the user took action himself
    pauseAutoScroll(5000);
  });

  // same as for the "previous" button for the "next" button but of course inverted
  $nextButton.click(function() {
    if (recTranslate > (widthToScroll * -1)) {
      recTranslate -= translateIncrem;
      applyTranslation();
    } else {
      recTranslate = 0;
      applyTranslation();
    }
    pauseAutoScroll(5000);
  });

  // active auto scroll and provide if it should be activated and how long the times should be
  activateAutoScroll(autoScroll, autoScrollSeconds);
});


// function to apply the current recTranslate value to the html by editing the css
function applyTranslation() {
  $carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
}


// function that does the auto scroll
function activateAutoScroll(activated, time) {
  // if it is activated
  if (activated) {
    // set interval to autoscroll every x seconds
    // this does the same as the "next" button
    autoScrollInterval = setInterval(function() {
      if (recTranslate > (widthToScroll * -1)) {
        recTranslate -= translateIncrem;
        applyTranslation();
      } else {
        recTranslate = 0;
        applyTranslation();
      }
    }, time * 1000);
  }
}


// function that pauses the auto scroll for x seconds
function pauseAutoScroll(pauseTime) {
  // clear the old auto scroll
  clearInterval(autoScrollInterval);
  // set timeout to active a new auto scroll after the pause
  setTimeout(function() {
    activateAutoScroll(autoScroll, autoScrollSeconds);
  }, pauseTime);
}