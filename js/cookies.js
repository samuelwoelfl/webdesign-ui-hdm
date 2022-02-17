// initialize variables for global scope
let $banners,
  $cookieBanner,
  $acceptedBanner,
  $deniedBannerlet,
  $welcomeBannerlet,
  $acceptCookiesButtonlet,
  $denieCookiesButtonlet,
  $resetCookiesButtonlet,
  $toggleCookiesButtonlet,
  $bannerCloseButtonlet,
  $cookieToggleModallet;
// set time between greetings so it doens't greet you everytime you switch to a subpage or refresh the page
let hoursBetweenGreetings = 1 / 2;


// the standard jquery function to run stuff after the DOM is build so that everything is available
$(document).ready(function() {

  // get all banners from html
  $banners = $('.start_banner');
  $cookieBanner = $('#cookie_banner');
  $acceptedBanner = $('#accepted_banner');
  $deniedBanner = $('#denied_banner');
  $welcomeBanner = $('#welcome_banner');
  // get all buttons from html
  $acceptCookiesButton = $('#accept_cookies');
  $denieCookiesButton = $('#denie_cookies');
  $resetCookiesButton = $('#reset_cookies');
  $toggleCookiesButton = $('#toogle_cookies_button');
  $toggleCookiesButton = $('#toogle_cookies_button');
  // get other elements from html
  $cookieToggleModal = $('.cookie_toggle_modal');
  $bannerCloseButtons = $('.banner_close_button');

  // get the cookiesAccepted cookie - if it doens't exist it will return false
  let cookiesAccepted = Cookies.get('cookiesAccepted');
  // set it fo false if it was undefined
  if (cookiesAccepted === undefined) {
    cookiesAccepted = false;
    // set it to boolean true if it returns the string "true"
  } else if (cookiesAccepted == 'true') {
    cookiesAccepted = true;
  }

  // get the welcomeShown cookie - if it doens't exist it will return false
  let welcomeShown = Cookies.get('welcomeShown');
  // set it fo false if it was undefined
  if (welcomeShown === undefined) {
    welcomeShown = false;
    // set it to boolean true if it returns the string "true"
  } else if (welcomeShown == 'true') {
    welcomeShown = true;
  }

  // check if the user already accepted cookies
  if (!cookiesAccepted) {
    // show cookie banner if not already accepted - wait 2 seconds for it to not directly destruct to user
    setTimeout(function() {
      $cookieBanner.fadeIn(100);
    }, 2000);
    // if he accepted cookies
  } else {
    // adjust the button text in the bottom right modal
    $toggleCookiesButton.html('Cookie-Wahl zurücksetzen');
    // check if welcome got shown
    if (!welcomeShown) {
      // if it wasn't shown already, show the welcome banner with the showToast function
      showToast($welcomeBanner);
      // set cookie that it was shown with an expiration of the declared hours between greetings so it will automatically delete itself after this time
      Cookies.set('welcomeShown', true, {
        expires: ((1 / 24) * hoursBetweenGreetings)
      });
    }
  }

  // set event listener for all the buttons on click

  $acceptCookiesButton.click(function() {
    // hide the cookie banner with jquery and 100s transitiion time
    $cookieBanner.fadeOut(100);
    // run accept cookies function
    acceptCookies();
  });

  $denieCookiesButton.click(function() {
    $cookieBanner.fadeOut(100);
    showToast($deniedBanner);
    // adjust button text in bottom right modal
    $toggleCookiesButton.html('Cookies akzeptieren');
  });

  $toggleCookiesButton.click(function() {
    $banners.fadeOut(100);
    // check if the user accepted the cookies to see if the action of the button should be a cookie accept or a reset
    cookiesAccepted = Cookies.get('cookiesAccepted');
    if (cookiesAccepted === undefined) {
      // run the accept cookies function if the cookies aren't accepted
      acceptCookies();
    } else if (cookiesAccepted == 'true') {
      // run reset cookies function to reset all cookies
      resetCookies();
    }
  });

  // if any of the close buttons gets clicked hide all banners to enable manual closes
  $bannerCloseButtons.click(function() {
    $banners.fadeOut(100);
  });
});


// function to accept cookies
function acceptCookies() {
  // set the cookie, change button text and show the corresponding banner
  Cookies.set('cookiesAccepted', 'true');
  $toggleCookiesButton.html('Cookie-Wahl zurücksetzen');
  showToast($acceptedBanner);
}

// function to reset cookies
function resetCookies() {
  // run the deleteAllCookies function to delete all cookies, change button text and show banner
  deleteAllCookies();
  $toggleCookiesButton.html('Cookies akzeptieren');
  showToast($deniedBanner);
}

// function to show a toast message
function showToast($banner) {
  // get the show duration set by a custom attribute in html for easier manipulation
  let showDuration = $banner.attr('show-duration');
  // set the animation-duration of the cooldown ring to the show duration so that it shows how long the banner will stay
  $banner.find('.progress-ring_circle').css('animation-duration', `${showDuration / 1000}s`);
  $banner.fadeIn(100);
  // fade out banner after the set show duration it not already closed manually
  setTimeout(function() {
    $banner.fadeOut(100);
  }, showDuration);
}

// function to delete all cookies
function deleteAllCookies() {
  // get all cookies
  let cookies = Cookies.get();
  // loop through every cookie and remove it
  for (let cookie in cookies) {
    Cookies.remove(cookie);
  }
}