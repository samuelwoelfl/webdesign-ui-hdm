// wait till the DOM is ready
$(document).ready(function() {
  // get html elements
  let $cursors = $('.custom-cursor');
  let $externalLinkCursor = $('.custom-cursor#external-link');
  let $projects = $('.project[onclick]');
  // initialize posX and posY
  let posX, posY;

  // event handler to show the custom cursor on hover
  $projects.hover(function() {
    $externalLinkCursor.fadeIn(0);
  }, function() {
    $externalLinkCursor.fadeOut(0);
  });

  // always position the custom cursor right at the real cursor with the mousemove event handler
  $(document).mousemove(function() {
    // get the mouse position based on the viewport
    posX = window.event.clientX;
    posY = window.event.clientY;
    // set the position of the cursor by adjusting the css
    $cursors.css('transform', `translate(${posX-25}px, ${posY-25}px)`);
  });
});