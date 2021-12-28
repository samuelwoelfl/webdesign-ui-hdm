$(document).ready(function() {

  // Alle Banner ausm HTML holen
  const $cookieBanner = $("#cookie_banner");
  const $acceptedBanner = $("#accepted_banner");
  const $deniedBanner = $("#denied_banner");
  const $welcomeBanner = $("#welcome_banner");
  // Alle Buttons ausm HTML holen
  const $acceptCookiesButton = $("#accept_cookies");
  const $denieCookiesButton = $("#denie_cookies");
  const $resetCookiesButton = $("#reset_cookies");


  let cookiesAccepted = Cookies.get('cookiesAccepted');
  if (cookiesAccepted === undefined) {
    cookiesAccepted = false;
  }

  hoursBetweenGreetings = 1;
  let welcomeShown = Cookies.get('welcomeShown');
  if (welcomeShown === undefined) {
    welcomeShown = false;
  }

  if (!cookiesAccepted) {
    setTimeout(function() {
      $cookieBanner.fadeIn(100);
    }, 1000);
  } else if (!welcomeShown) {
    showToast($welcomeBanner);
    Cookies.set('welcomeShown', true, {
      expires: ((1 / 24) * hoursBetweenGreetings)
    });
  }

  $acceptCookiesButton.click(function() {
    Cookies.set('cookiesAccepted', true);
    $cookieBanner.fadeOut(100);
    showToast($acceptedBanner);
  });

  $denieCookiesButton.click(function() {
    $cookieBanner.fadeOut(100);
    showToast($deniedBanner);
  });

  $resetCookiesButton.click(function() {
    $welcomeBanner.fadeOut(100);
    deleteAllCookies();
    showToast($deniedBanner);
  });
});

function showToast($banner) {
  let showDuration = $banner.attr("show-duration");
  $banner.find('.progress-ring_circle').css('animation-duration', `${showDuration / 1000}s`);
  $banner.fadeIn(100);
  setTimeout(function() {
    $banner.fadeOut(100);
  }, showDuration);
}

function deleteAllCookies() {
  let cookies = Cookies.get();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
}
