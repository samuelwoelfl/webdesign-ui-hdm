// Variablen für global scope initialisieren
let $banners;
let $cookieBanner;
let $acceptedBanner;
let $deniedBanner;
let $welcomeBanner;
let $acceptCookiesButton;
let $denieCookiesButton;
let $resetCookiesButton;
let $toggleCookiesButton;
let $bannerCloseButton;
let $cookieToggleModal;


// Document ready function for all triggering stuff
$(document).ready(function() {

  // Alle Banner ausm HTML holen
  $banners = $('.start_banner');
  $cookieBanner = $("#cookie_banner");
  $acceptedBanner = $("#accepted_banner");
  $deniedBanner = $("#denied_banner");
  $welcomeBanner = $("#welcome_banner");
  // Alle Buttons ausm HTML holen
  $acceptCookiesButton = $("#accept_cookies");
  $denieCookiesButton = $("#denie_cookies");
  $resetCookiesButton = $("#reset_cookies");
  $toggleCookiesButton = $("#toogle_cookies_button");
  $toggleCookiesButton = $("#toogle_cookies_button");
  // weitere Elemente
  $cookieToggleModal = $(".cookie_toggle_modal"); $bannerCloseButtons = $(".banner_close_button");

  let cookiesAccepted = Cookies.get('cookiesAccepted');
  if (cookiesAccepted === undefined) {
    cookiesAccepted = false;
  }

  hoursBetweenGreetings = 1/2;
  let welcomeShown = Cookies.get('welcomeShown');
  if (welcomeShown === undefined) {
    welcomeShown = false;
  }

  if (!cookiesAccepted) {
    setTimeout(function() {
      $cookieBanner.fadeIn(100);
    }, 1000);
  } else {
    $toggleCookiesButton.html("Cookie-Wahl zurücksetzen");
    if (!welcomeShown) {
      showToast($welcomeBanner);
      Cookies.set('welcomeShown', true, {
        expires: ((1 / 24) * hoursBetweenGreetings)
      });
    }
  }

  $acceptCookiesButton.click(function() {
    $cookieBanner.fadeOut(100);
    acceptCookies();
  });

  $denieCookiesButton.click(function() {
    $cookieBanner.fadeOut(100);
    showToast($deniedBanner);
    $toggleCookiesButton.html("Cookies akzeptieren");
  });

  $toggleCookiesButton.click(function() {
    $banners.fadeOut(100);
    if (Cookies.get('cookiesAccepted')) {
      resetCookies();
    } else {
      acceptCookies();
    }
  });

  $bannerCloseButtons.click(function() {
    $banners.fadeOut(100);
  });
});


// Define all functions
function acceptCookies() {
  Cookies.set('cookiesAccepted', true);
  $toggleCookiesButton.html("Cookie-Wahl zurücksetzen");
  showToast($acceptedBanner);
}

function resetCookies() {
  deleteAllCookies();
  $toggleCookiesButton.html("Cookies akzeptieren");
  showToast($deniedBanner);
}

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
  for (let cookie in cookies) {
    Cookies.remove(cookie);
  }
}
