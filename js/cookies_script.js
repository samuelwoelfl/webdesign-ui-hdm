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

  hoursBetweenGreetings = 5;
  var welcomeShown = Cookies.get('welcomeShown');
  if (welcomeShown === undefined) {
    welcomeShown = false;
  }

  if (!cookiesAccepted) {
    $cookieBanner.delay(2000).fadeIn(100);
  } else if (!welcomeShown) {
    showBanner($welcomeBanner);
    Cookies.set('welcomeShown', true, {
      expires: ((1 / 24) * hoursBetweenGreetings)
    });
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