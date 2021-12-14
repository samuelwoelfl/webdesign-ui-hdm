$(document).ready(function() {

  const $cookieBanner = $("#cookie_banner");
  const $acceptCookiesButton = $("#accept_cookies");
  const $welcomeBanner = $("#welcome_banner");


  var cookiesAccepted = Cookies.get('cookiesAccepted');
  if (cookiesAccepted === undefined) {
    var cookiesAccepted = false;
  }

  var hoursBetweenGreetings = 5;
  var today = new Date();
  var fallbackTime = today - (1000 * 60 * 60 * hoursBetweenGreetings)

  var welcomeShownTime = Cookies.get('welcomeShownTime');
  if (welcomeShownTime === undefined) {
    var welcomeShownTime = fallbackTime;
  }

  if (!cookiesAccepted) {
    $cookieBanner.delay(2000).fadeIn(100);
  } else if (welcomeShownTime <= fallbackTime) {
    $welcomeBanner.delay(1000).fadeIn(100);
    $welcomeBanner.delay(2500).fadeOut(100);
    Cookies.set('welcomeShownTime', Date.now());
  }

  $acceptCookiesButton.click(function() {
    Cookies.set('cookiesAccepted', true);
    $cookieBanner.hide();
  });

});