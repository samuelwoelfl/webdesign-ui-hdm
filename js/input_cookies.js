$(document).ready(function() {

  let $inputs = $("input:not([type=submit])")

  fillInputs($inputs);

  $inputs.on("input", function() {
    let name = $(this).attr('name');
    let value = $(this).val();
    if (Cookies.get('cookiesAccepted') == 'true' && value != "") {
      Cookies.set(name + '-inputCookie', value);
    }
  });

});

function fillInputs($inputs) {
  $.each($inputs, function(i, item) {
    let value = Cookies.get($(this).attr('name') + '-inputCookie')
    $(this).val(value);
  });
}
