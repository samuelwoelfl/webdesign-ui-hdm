let $inputs;
let valid;
let mailId = "mail";
let errorMessageEmpty = "Dieses Feld muss ausgefüllt werden";
let errorMessageInvalidMail = "Dies ist keine valide Mail";

$(document).ready(function() {

  $inputs = $("input:not([type=submit])");

  fillInputs($inputs);

  $inputs.on("input", function() {
    let name = $(this).attr('name');
    let value = $(this).val();
    if (Cookies.get('cookiesAccepted') == 'true') {
      Cookies.set(name + '-inputCookie', value);
    }
    validateInput($(this));
  });

  // $inputs.on("blur", function() {
  //   validateInput($(this));
  // });

});


function validateInput(input, focus) {
  if (focus === undefined) {
    focus = false;
  }
  input = $(input);
  let value = input.val();
  let id = input.attr("id");
  let nextElem = input.next();
  let nextElemClass = nextElem.attr("class");
  let selector = ".error" + "[for='" + input.attr("id") + "']";
  let message = "";

  if (value == "") {
    // console.log("Leer: " + input.attr('id'));
    message = errorMessageEmpty;
  } else {
    if (input.attr("id") == mailId) {
      let countAt = (value.match(/@/g) || []).length;
      let countDot = (value.match(/\./g) || []).length;

      if (countAt == 1 && countDot >= 1) {
        message = "";
      } else {
        message = errorMessageInvalidMail;
      }
    }
  }

  if (message.length > 0) {
    if (nextElemClass == "error_message") {
      nextElem.html(`${message}`);
    } else {
      $(`input#${id}`).get()[0].insertAdjacentHTML("afterend",
        `<p class="error_message">${message}</p>`);
    }
    if (focus) {
      $(`input#${id}`)[0].focus();
    }
  } else {
    if (nextElemClass == "error_message") {
      nextElem.remove();
    }
  }
}


function validateMail() {
  $.each($inputs, function(i, input) {
    validateInput(input, true);
  });
}

function sendMail() {
  validateMail();
}


function fillInputs($inputs) {
  $.each($inputs, function(i, item) {
    let value = Cookies.get($(this).attr('name') + '-inputCookie')
    $(this).val(value);
  });
}