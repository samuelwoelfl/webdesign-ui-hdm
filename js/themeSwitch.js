// document ready to wait till the DOM is ready
$(document).ready(function() {

  // get the current url
  let currentURL = location.href;

  // get elements from html
  let $sun = $('#sun_icon');
  let $moon = $('#moon_icon');
  let html = document.querySelector('html');

  // initialize variables
  let theme, color;

  // set all the values for the particlesJS library
  let info = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#FFFFFF'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
      },
      opacity: {
        value: 0.3,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#FFFFFF',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }

  // get the theme from cookies
  let cookiesTheme = Cookies.get('theme');
  // if there is no cookie...
  if (cookiesTheme === undefined) {
    let systemTheme;
    // ...look at the browser/os settings to adjust it depending on the user preferences
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      systemTheme = 'dark';
    } else {
      systemTheme = 'light';
    }
    theme = systemTheme;
  } else {
    theme = cookiesTheme;
  }

  // set the theme
  switchTheme(theme);


  // ------------- Particle.js ------------------

  // don't run particlesJS on galerie or tictactoe page
  if (!currentURL.includes('galerie') && !currentURL.includes('tictactoe')) {
    // get the current text color to set the particles color based on the theme
    color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trimStart();
    // initialize variables
    var count_particles, stats, update;

    // update function from particlesJS
    update = function() {
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    // start particlesJS
    particlesJS('particles-js', info);
  }

  // ------------ Particle.js End ----------------


  // event handler to check if the sun icon get's clicked and then change the theme
  $sun.click(function() {
    switchTheme('dark');
  });
  // same for the moon icon
  $moon.click(function() {
    switchTheme('light');
  });


  // function to switch the theme
  function switchTheme(theme) {
    // change the icon
    if (theme === 'light') {
      $sun.show();
      $moon.hide();
    } else {
      $sun.hide();
      $moon.show();
    }

    // set the theme as attribute in the html
    html.dataset.theme = `theme-${theme}`;
    if (Cookies.get('cookiesAccepted') == 'true') {
      Cookies.set('theme', `${theme}`);
    }

    // get the current text color
    color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trimStart();
    // only do this if the page is not galerie or tictactoe
    if (!currentURL.includes('galerie') && !currentURL.includes('tictactoe')) {
      // set the color of the particles and lines in particlesJS
      info['particles']['color']['value'] = `${color}`;
      info['particles']['line_linked']['color'] = `${color}`;
      // rerun particlesJS
      particlesJS('particles-js', info);
    }

  }

});