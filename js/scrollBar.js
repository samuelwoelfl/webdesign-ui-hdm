$(document).scroll(function(e) {
  var scrollAmount = $(window).scrollTop();
  var documentHeight = $(document).height();
  var windowHeight = $(window).height();
  var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
  var scrollRounded = Math.round(scrollPercent);

  // For scrollbar 1
  $(".scrollBar1").css("width", scrollPercent + "%");
});