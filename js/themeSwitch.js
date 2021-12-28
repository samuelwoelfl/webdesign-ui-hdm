$(document).ready(function() {

  // Beim Laden der Seite sollte die Theme Transition noch nicht smooth sondern möglichst unauffällig stattfinden und deswegen wird die transition erst nach dem Laden eingefügt
  // setTimeout(function () {
  //   $("body").css("transition","background-color .5s ease, color .5s ease");
  // }, 100);

  // Elemente aus HTML bekommen
  const $sun = $("#sun_icon");
  const $moon = $("#moon_icon");
  const html = document.querySelector('html');

  let theme;
  let cookiesTheme = Cookies.get('theme');
  if (cookiesTheme === undefined) {
    let systemTheme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      systemTheme = 'dark';
    } else {
      systemTheme = 'light';
    }
    theme = systemTheme;
  } else {
    theme = cookiesTheme;
  }

  if (theme == 'dark') {
    switchTheme('dark');
  } else {
    switchTheme('light');
  }

  $sun.click(function() {
    switchTheme('dark');
  });
  $moon.click(function() {
    switchTheme('light');
  });

  function switchTheme(theme) {
    if (theme === 'light') {
      // Change Icon
      $sun.show();
      $moon.hide();
    } else {
      // Change Icon
      $sun.hide();
      $moon.show();
    }
    html.dataset.theme = `theme-${theme}`;
    if (Cookies.get('cookiesAccepted') == 'true') {
      Cookies.set('theme', `${theme}`);
    }
  }

});
