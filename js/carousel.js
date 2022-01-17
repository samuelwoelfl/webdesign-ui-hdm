$(document).ready(function() {
  recCarouselEvents();
});

function recCarouselEvents() {
  let recTranslate = 0;
  let carouselList = $('.carousel-list');
  let listItems = $('.carousel-recs .carousel-listitem');
  let itemsCount = listItems.length;

  let singleItem = $(listItems[0]);
  let singleItemWidth = singleItem.outerWidth(true);
  let singleItemWidthWithoutMargin = singleItem.outerWidth(false);

  let margin = singleItemWidth - singleItemWidthWithoutMargin;

  let fullWidth = Math.round((singleItemWidth * listItems.length));

  let visibleWidth = $('.carousel-body').outerWidth(true);
  let visibleItems = visibleWidth / singleItemWidth;
  let widthToScroll = Math.round(fullWidth - visibleWidth - margin);
  let translateInrcem = widthToScroll / Math.round((itemsCount / 3));


  $('.carousel-prev-rec').click(function() {
    if (recTranslate < -1) {
      recTranslate += translateInrcem;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
      $('.carousel-next-rec').addClass("active");
      if (recTranslate > -1) {
        $('.carousel-prev-rec').removeClass("active");
      }
    }
  })

  $('.carousel-next-rec').click(function() {
    if (recTranslate >= ((widthToScroll * -1) + 5)) {
      recTranslate -= translateInrcem;
      carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
      $('.carousel-prev-rec').addClass("active");
      if (recTranslate <= ((widthToScroll * -1) + 5)) {
        $('.carousel-next-rec').removeClass("active");
      }
    }
  });

  // setInterval(function() {
  //   if (recTranslate >= ((widthToScroll * -1) + 5)) {
  //     recTranslate -= translateInrcem;
  //     carouselList.css('transform', 'translatex(' + recTranslate + 'px)');
  //     $('.carousel-prev-rec').addClass("active");
  //     if (recTranslate <= ((widthToScroll * -1) + 5)) {
  //       $('.carousel-next-rec').removeClass("active");
  //     }
  //   }
  // }, 3000);
}