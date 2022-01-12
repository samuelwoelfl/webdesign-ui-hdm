let $inputs;
let mailId = "mail";
let mailBlurValidations = 0;
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
    if ($(this).attr("id") == mailId) {
      if (mailBlurValidations == 0) {
        setTimeout(function() {
            validateInput($(this));
        }, 2000);
      } else {
        validateInput($(this))
      }
    } else {
      validateInput($(this));
    }
  });

  $inputs.on("blur", function() {
    validateInput($(this));
    if ($(this).attr("id") == mailId) {
      mailBlurValidations += 1;
    }
  });

  // TODO: fix this
  window.onbeforeunload = function() {
    if (isDirty) {
      return 'There is unsaved data.';
    }
    return undefined;
  }

});


function validateInput(input, focus, highlight) {
  if (focus === undefined) {
    focus = false;
  }
  if (highlight === undefined) {
    highlight = false;
  }
  input = $(input);
  let value = input.val();
  let id = input.attr("id");
  let $nextElem = input.next();
  let $nextElemClass = $nextElem.attr("class");
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
    if ($nextElemClass == "error_message") {
      $nextElem.html(`${message}`);
      if (highlight) {
        $nextElem.effect("bounce", "slow");
      }
    } else {
      $(`input#${id}`).get()[0].insertAdjacentHTML("afterend",
        `<p class="error_message">${message}</p>`);
    }
    input.addClass("error");
    if (focus) {
      $(`input#${id}`)[0].focus();
    }
    return false
  } else {
    if ($nextElemClass == "error_message") {
      $nextElem.remove();
      input.removeClass("error");
    }
  }

}


function sendMail() {
  let valids = [];
  $.each($inputs, function(i, input) {
    valids.push(validateInput(input, true, true));
  });
  if (!valids.includes(false)) {
    window.open('mailto:test@example.com?subject=subject&body=body');
  }
}


function fillInputs($inputs) {
  $.each($inputs, function(i, item) {
    let value = Cookies.get($(this).attr('name') + '-inputCookie')
    $(this).val(value);
  });
}
