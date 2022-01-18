$(document).ready(function() {
  let cursors = $(".custom-cursor");
  let externalLinkCursor = $(".custom-cursor#external-link");
  let projects = $(".project[onclick*='window']");
  let posX, posY;

  console.log(projects);

  projects.hover(function() {
    externalLinkCursor.fadeIn(0);
  }, function() {
    externalLinkCursor.fadeOut(0);
  });

  $(document).mousemove(function() {
    posX = window.event.clientX;
    posY = window.event.clientY;
    cursors.css('transform', `translate(${posX-25}px, ${posY-25}px)`);
  });
});