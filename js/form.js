// initialize for global scope
let $inputs;

// Some variables so that you can change them easily
let mailId = "mail";
let errorMessageClass = "error_message";
let errorMessageEmpty = "Dieses Feld muss ausgefüllt werden";
let errorMessageInvalidMail = "Dies ist keine valide Mail";

// initialize her so the counting is set
let mailBlurValidations = 0;

// the standard jquery function to run stuff after the DOM is build so that everything is available
$(document).ready(function() {

  // populate the inputs variable since nearly everything is using it here
  // the selector selects all inputs in the html but only "real" inputs by avoiding the submit button
  $inputs = $("input:not([type=submit])");

  // run the fillInputs function with all inputs to populate them with the available values from cookies
  fillInputs($inputs);

  // add an event listener to safe an input value to a cookie when the input value changes
  $inputs.on("input", function() {
    // get name attribute of input
    let name = $(this).attr('name');
    // get value of input
    let value = $(this).val();
    // set the custom cookie for this field if cookies are accepted
    if (Cookies.get('cookiesAccepted') == 'true') {
      // custom cookie name including the name attribute so it can automatically assign them on reading them
      Cookies.set(name + '-inputCookie', value);
    }
    // check if it is the mail input since it requires more time to insert a valid mail
    if ($(this).attr("id") == mailId) {
      // if this field hasn't been leaved ("blurred") before or in other words it's the first time the user uses it, it should not directly fire the validation on every change since the first characters will never be valid even if the user will insert a valid mail
      // it will start to validate on change if the users selects it for the second time or more to for example correct his error => then this is helpful, because he will directly see if his changes made the email valid and not only when he leaves the field
      if (mailBlurValidations != 0) {
        validateInput($(this));
      }
    // if it's any other input it will just validate on every change since this is the most convenient option for the user => he instantly sees the error he made
    } else {
      validateInput($(this));
    }
  });

  // Also add the validation on blur so the user sees if he made an error directly after leaving the field even if he didn't make any changes => extra important for the first time the user puts in his mail because the onchange validation is deactivatet there
  $inputs.on("blur", function() {
    validateInput($(this));
    // count up the mail blur validations so it knows that it can now use the onchange validation
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


// validate input function

// --- what the function does ---
// it checks if inputs are filled and also has some more in depth check for emails. It will do all fancy visual stuff like error messages and will return true or false depnding if the corresponding input is valid or not

// --- parameters ---
// input => html element: the field that should get validated
// focus => optional boolean: says if the field should be focused after validation if it has an error -> nice for the user that he can directly change the input without using his mouse
// highlight => optional boolean: says if the error message should get a quick highlight animation if the validation stated the same error again so the user notices it. He maybe wouldn't notice without because the error message stays the same

function validateInput(input, focus, highlight) {
  // set the booleans to false if they weren't provided
  if (focus === undefined) {
    focus = false;
  }
  if (highlight === undefined) {
    highlight = false;
  }
  // convert the provided input html element to a jquery opject to enable jquery functions for it
  input = $(input);
  // get value of input
  let value = input.val();
  // get id of input
  let id = input.attr("id");
  // get next element of input
  let $nextElem = input.next();
  // get class of next element to check if this input already has an error message
  let $nextElemClass = $nextElem.attr("class");
  // initialize the message variable so it's always available
  let message = "";

  // choose which error message should be shown
  if (value == "") {
    message = errorMessageEmpty;
  // if it is already filled and it's the mail input check if it's valid
  } else if (input.attr("id") == mailId) {
    // count the @ and dots with a simple regex to check if it's really an email
    // regex explanaition: the character between the slashes is the character that will be searched and the g states that it should search for every occurence and not only the first
    let countAt = (value.match(/@/g) || []).length;
    // the backslash infront of the dot just works as an escape character to prevent the dot from being interpreted as regex
    let countDot = (value.match(/\./g) || []).length;

    // the final validation => check if the mail has exactly one @ and minimum one dot and set the error message regarding the result
    if (countAt == 1 && countDot >= 1) {
      message = "";
    } else {
      message = errorMessageInvalidMail;
    }
  }

  // check if there is an error - which is recognized by the error message
  if (message.length > 0) {
    // check if there already is an error message to rewrite this instead of adding another one
    if ($nextElemClass == errorMessageClass) {
      // rewrite the error message to the new one
      $nextElem.html(`${message}`);
      // if it should be highlighted, put the jquery ui bounce effect on it
      if (highlight) {
        $nextElem.effect("bounce", "slow");
      }
    // if there is no error message create one
    } else {
      // create the error message with a formatted string and put it in the DOM right after the corresponding input by using the vanilla js function insertAdjacentHTML (also tried jquery functions but they didn't completely work).
      // used document.querySelector here to directly get the html object and not the jquery object since we need to use a vanilla js function
      document.querySelector(`input#${id}`).insertAdjacentHTML("afterend",
        `<p class="${errorMessageClass}">${message}</p>`);
    }
    // add the class to the input element so the styling can be adjusted in CSS
    input.addClass("error");
    // if it should be focused it will focus the input
    if (focus) {
      $(`input#${id}`)[0].focus();
    }
    // return false in the end of all error message stuff to forther work with it
    return false

  // if there is no error this time clear potential error messages from bevore and return true
  } else {
    // check if there already is an error message
    if ($nextElemClass == "error_message") {
      // remove the error message
      $nextElem.remove();
      // remove the error class for styles
      input.removeClass("error");
    }
    // return true to further work with that
    return true
  }

}


// send mail function that get's called on form submission
function sendMail() {
  // create a list for all the validation responses
  let valids = [];
  // go through all inputs and validate them
  $.each($inputs, function(i, input) {
    // run the validation for the input with the focus and highlight option turned on since it's at the end and not in the middle of the filling process where this might distract and confuse the user
    // add the response to the list
    valids.push(validateInput(input, true, true));
  });
  // if none of the input validations returned false open the mail program (can't send mails directly with vanilla js so this is the closest)
  if (!valids.includes(false)) {
    // TODO: insert better subject and properties
    window.open('mailto:test@example.com?subject=subject&body=body');
  }
}


// function that fills all inputs based on existing cookies

// --- parameters ---
// $inputs => list of jquery objects: all inputs that should get filled
function fillInputs($inputs) {
  // go through all inputs
  $.each($inputs, function(i, input) {
    // get value of the cookie which has the name of the input name
    let value = Cookies.get($(this).attr('name') + '-inputCookie');
    // put the value into the corresponding input
    $(this).val(value);
  });
}
