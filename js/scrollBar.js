$(document).scroll(function(e) {
  let scrollAmount = $(window).scrollTop();
  let documentHeight = $(document).height();
  let windowHeight = $(window).height();
  let scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
  let scrollRounded = Math.round(scrollPercent);

  $(".scrollBar").css("width", scrollPercent + "%");
});