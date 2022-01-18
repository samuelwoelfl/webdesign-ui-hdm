$(document).ready(function() {

  // Elemente aus HTML bekommen
  let $sun = $("#sun_icon");
  let $moon = $("#moon_icon");
  let html = document.querySelector('html');

  let theme, color;
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
        value: "#FFFFFF"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
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
        color: "#FFFFFF",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
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


  // ------------- Particle.js ------------------
  color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trimStart();
  console.log(color);
  var count_particles, stats, update;

  update = function() {
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);

  particlesJS("particles-js", info);
  // ------------ Particle.js End ----------------


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
    color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trimStart();
    info["particles"]["color"]["value"] = `${color}`;
    info["particles"]["line_linked"]["color"] = `${color}`;
    particlesJS("particles-js", info);
  }

});