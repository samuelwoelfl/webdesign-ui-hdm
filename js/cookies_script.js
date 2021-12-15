$(document).ready(function() {

  const $cookieBanner = $("#cookie_banner");
  const $acceptedBanner = $("#accepted_banner");
  const $deniedBanner = $("#denied_banner");
  const $welcomeBanner = $("#welcome_banner");

  const $acceptCookiesButton = $("#accept_cookies");
  const $denieCookiesButton = $("#denie_cookies");
  const $resetCookiesButton = $("#reset_cookies");


  var cookiesAccepted = Cookies.get('cookiesAccepted');
  if (cookiesAccepted === undefined) {
    cookiesAccepted = false;
  }

  var hoursBetweenGreetings = 5;
  var today = new Date();
  var fallbackTime = today - (1000 * 60 * 60 * hoursBetweenGreetings)

  var welcomeShownTime = Cookies.get('welcomeShownTime');
  if (welcomeShownTime === undefined) {
    welcomeShownTime = fallbackTime;
  }

  if (!cookiesAccepted) {
    $cookieBanner.delay(2000).fadeIn(100);
  } else if (welcomeShownTime <= fallbackTime) {
    showBanner($welcomeBanner);
    Cookies.set('welcomeShownTime', Date.now());
  }

  $acceptCookiesButton.click(function() {
    Cookies.set('cookiesAccepted', true);
    $cookieBanner.fadeOut(100);
    showBanner($acceptedBanner);
  });

  $denieCookiesButton.click(function() {
    $cookieBanner.fadeOut(100);
    showBanner($deniedBanner);
  });

  $resetCookiesButton.click(function() {
    $welcomeBanner.fadeOut(100);
    deleteAllCookies();
    showBanner($deniedBanner);
  });

  function showBanner($banner) {
    var showDuration = $banner.attr("show-duration");
    $banner.find('.progress-ring_circle').css('animation-duration', `${showDuration / 1000}s`);
    $banner.fadeIn(100);
    $banner.delay(showDuration).fadeOut(100);
  }

  function deleteAllCookies() {
    var cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  }

});