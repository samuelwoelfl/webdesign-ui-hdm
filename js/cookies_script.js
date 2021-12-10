$(document).ready(function() {

  const $cookieBanner = $("#cookie_banner");
  const $acceptCookiesButton = $("#accept_cookies");
  const $welcomeBanner = $("#welcome_banner");

  var cookiesAccepted = false;
  var cookiesAccepted = Cookies.get('cookiesAccepted');

  if (!cookiesAccepted) {
    $cookieBanner.delay(2000).fadeIn(100);
  } else {
    $welcomeBanner.delay(1000).fadeIn(100);
    $welcomeBanner.delay(2500).fadeOut(100);
  }

  $acceptCookiesButton.click(function() {
    Cookies.set('cookiesAccepted', true)
    $cookieBanner.hide();
  });

});