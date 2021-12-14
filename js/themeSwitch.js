$(document).ready(function() {
  const $sun = $("#sun_icon");
  const $moon = $("#moon_icon");

  const html = document.querySelector('html');
  const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isOsDark) {
    switchTheme('dark');
  } else {
    switchTheme('light');
  }

  $sun.click(function() {
    switchTheme('dark');
    // TODO: Set Cookie for theme
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
  }

});