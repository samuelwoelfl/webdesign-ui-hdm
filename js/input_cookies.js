$(document).ready(function() {

  var $inputs = $("input:not([type=submit])")

  fillInputs($inputs);

  $inputs.on("input", function() {
    var name = $(this).attr('name');
    var value = $(this).val();
    if (Cookies.get('cookiesAccepted') == 'true' && value != "") {
      Cookies.set(name + '-inputCookie', value);
    }
  });

});

function fillInputs($inputs) {
  $.each($inputs, function(i, item) {
    var value = Cookies.get($(this).attr('name') + '-inputCookie')
    $(this).val(value);
  });
}