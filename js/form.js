let $inputs;

$(document).ready(function() {

  $inputs = $("input:not([type=submit])");

  fillInputs($inputs);

  $inputs.on("input", function() {
    let name = $(this).attr('name');
    let value = $(this).val();
    if (Cookies.get('cookiesAccepted') == 'true' && value != "") {
      Cookies.set(name + '-inputCookie', value);
    }
  });

});


function sendMail() {
    // let inputs = $("input:not([type=submit])");
    let $mailInput = $("input#mail");
    let mailInputValue = $mailInput.val();

    $.each($inputs, function (i, input) {
        input = $(input);
        let value = input.val();
        let id = input.attr("id");
        let selector = ".error" + "[for='" + input.attr("id") + "']";
        let message = "";

        if (value == "") {
            // console.log("Leer: " + input.attr('id'));
            message = "Dieses Feld muss ausgefüllt werden";
        } else {
            if (input.attr("id") == "mail") {
                let countAt = (mailInputValue.match(/@/g) || []).length;
                let countDot = (mailInputValue.match(/\./g) || []).length;

                console.log("Äts: " + countAt);
                console.log("Punkte: " + countDot);

                if (countAt == 1 && countDot >= 1) {
                    message = ""
                } else {
                    message = "Dies ist keine valide Mail"
                }
            }
        }

        // $(`input#{id}`)[0].html(message);
        // $(`input#${id}`)[0].after(`<p class="error_message">${message}</p>`);
        $(`input#${id}`)[0].after("<p>test</p>");
        $(`input#${id}`)[0].focus();
    });
}


function fillInputs($inputs) {
  $.each($inputs, function(i, item) {
    let value = Cookies.get($(this).attr('name') + '-inputCookie')
    $(this).val(value);
  });
}
