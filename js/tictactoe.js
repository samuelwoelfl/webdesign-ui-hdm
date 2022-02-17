// initialize global variables
let $winStateSpan;
let $allBoxes;
let states = [];
let playerX = [];
let playerO = [];

// set player states to 0 in the beginning
let scoreX = 0;
let scoreO = 0;

// set the current player in the beginning;
let currentPlayer = 'X';

// store all win combinations to check for win later
let winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// do things when the DOM is loaded
$(document).ready(function() {
  // set the current player info in the html
  $('#current_player').html(currentPlayer);
  // get the html elements in variables
  $winStateSpan = $('#win_state');
  $allBoxes = $('.box');
  // fill all existing information from cookies, so you could continue playing where you stopped, even after reloading
  fillGameInfoFromCookies();
  // directly check for win, if you reload while anybody won
  checkForWin();

  // Event handler that registers when one of the box is clicked
  $allBoxes.click(function() {
    // only do stuff if it's not already filled
    if (!$(this).attr('class').includes('filled')) {
      // write the mark of the current player in the box
      $(this).html(currentPlayer);
      // add the filled class to this box so it cannot be clicked again
      $(this).addClass('filled');
      // get the number of the box that was clicked for further calculations
      index = $allBoxes.index($(this));
      // update the "states", "playerX", "plaxerO" variables in JS, which store all the game information and transfer the index so it knows which box has been clicked
      updateStates(index);
      // after the states are up to date check if somebody has won now or it the game is finished with a draw
      checkForWin();
      // switch the player
      switchPlayer();
    }
  });

});


// function that just switches the players and cares about all the stuff coming with it like writing it to html and storing it into cookies
function switchPlayer() {
  // check which is the player right now and change it depending on this
  if (currentPlayer == 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  // ...and write it in the html
  $('#current_player').html(currentPlayer);
  // ... and put it into cookies
  if (Cookies.get('cookiesAccepted') == 'true') {
    Cookies.set('currentPlayer', currentPlayer);
  }
}


// function that updates all the game information variables and cares about the stuff that comes with it like cookies
function updateStates(index) {
  // clear the states list
  states = [];
  // fill the states list with the current state
  $.each($allBoxes, function(i, item) {
    states.push($(this).html());
  });

  // put it into cookies
  if (Cookies.get('cookiesAccepted') == 'true') {
    Cookies.set('tictactoeStates', states);
  }

  // if a user clicked a box (this is when an index is provided) check which user must have did it and then add this box to the users boxes list (playerX or playerO)
  if (index != undefined) {
    if (currentPlayer == 'X') {
      playerX.push(index);
      // update the cookie
      if (Cookies.get('cookiesAccepted') == 'true') {
        Cookies.set('playerX', playerX);
      }
    } else {
      playerO.push(index);
      // update the cookie
      if (Cookies.get('cookiesAccepted') == 'true') {
        Cookies.set('playerO', playerO);
      }
    }
  }

}


// function the cares about reading all the information in cookies and filling it into the corresponding elements
function fillGameInfoFromCookies() {
  // try statement to prevent errors, when there are no cookies
  try {
    // fill the boxes - get the cookies first
    statesCookie = Cookies.get('tictactoeStates');
    // only run it if the cookie exists
    if (statesCookie != undefined) {
      // transform the cookie from a string to a list with strings again
      states = cookiesStringToList(statesCookie, 'strings');
      $.each($allBoxes, function(i, item) {
        $(this).html(states[i]);
      });
      // fill the player variables from cookies - "|| []" so that it will return an empty list if there is no cookie
      playerX = (cookiesStringToList(Cookies.get('playerX'), 'numbers') || [])
      playerO = (cookiesStringToList(Cookies.get('playerO'), 'numbers') || [])

      // set the scores
      scoreX = (parseInt(Cookies.get('scoreX')) || 0);
      scoreO = (parseInt(Cookies.get('scoreO')) || 0);
      $('#scoreX').html(scoreX);
      $('#scoreO').html(scoreO);

      // set the current player
      currentPlayer = Cookies.get('currentPlayer');
      $('#current_player').html(currentPlayer);
    }
  } catch (e) {}
}


// helper function that converts a list in form of a string to a real list - this is important for cookies, since they can only be strings
// you provide the string that should be transformed and the type that the elements should get to decide if you want string elements or number elements inside the list
function cookiesStringToList(string, type) {
  try {
    // remove the parenthesis around the string
    string = string.slice(1, -1);
    // remove all "
    let stringClean = string.replaceAll('"', '');
    // create a list from the string by splitting it at every comma
    list = stringClean.split(',');
    // if the type is set to "numbers" it will also transform every value to an integer
    if (type == 'numbers') {
      $.each(list, function(i, item) {
        list[i] = parseInt(list[i]);
      });
    }
    // return the list
    return list
  } catch (e) {
    // if an error orrured return undefined
    return undefined
  }
}


// simple function that updates the score in the html and in the cookies
function updateCount() {
  $('#scoreX').html(scoreX);
  $('#scoreO').html(scoreO);
  if (Cookies.get('cookiesAccepted') == 'true') {
    Cookies.set('scoreX', scoreX);
    Cookies.set('scoreO', scoreO);
  }
}


// function that checks if any of the players has won or if it's a draw
function checkForWin() {
  // go through every win combination to check if any of the users fulfills one of them
  for (let i in winCombinations) {
    // get the combination which it is about
    c = winCombinations[i];
    // check if player X fulfills this combination in any order
    if (playerX.includes(c[0]) && playerX.includes(c[1]) && playerX.includes(c[2])) {
      // end the game and provide X as the winner and c as the winning combination for the highlight
      restartGame('X', c);
      // stop the loop if the game is finished
      break
      // check if player O fulfills this combination in any order
    } else if (playerO.includes(c[0]) && playerO.includes(c[1]) && playerO.includes(c[2])) {
      // same as player X for player O
      restartGame('O', c);
      break
      // if none of the players has won, check if it's the last combination (to prevent from thinking it's a draw if one of the players won with one of the later combinations) and if the states got filled and if they all not only contain nothing ...
    } else if (i == (winCombinations.length - 1) && states.length == 9 && !states.includes('')) {
      // ... if so end the game with a draw
      restartGame(null, null);
      break
    }
  }
}


// function that cares about all that should happen if the game ends and restart it
// provide the winner and the combination with which he won
function restartGame(winner, combination) {
  // check if there is a winner or it's a draw
  if (winner != null) {
    // write in the html who won
    $winStateSpan.html(`${winner} gewinnt`);
    // block all boxes by adding the "filled" class so that you can't play anymore
    $.each($allBoxes, function(i, item) {
      $(this).addClass('filled');
    });
    // highlight the winning combination
    highlightWin(combination);
    // count up the score
    if (winner == 'X') {
      scoreX += 1;
    } else if (winner == 'O') {
      scoreO += 1;
    }
    // update the count in the html
    updateCount();
  } else {
    // if it's a draw write in the html
    $winStateSpan.html('Unentschieden');
  }

  // wait for 2s and then reset the game
  setTimeout(function() {
    reset();
  }, 2000);
}


// function that highlights the boxes in the winning combination by adding a class
function highlightWin(combination) {
  $.each(combination, function(i, item) {
    $($allBoxes[this]).addClass('win');
  });
}


// function that resets the game to start a fresh one
function reset() {
  // clear the game variables in JS
  states = [];
  playerX = [];
  playerO = [];
  // clear the game variables in the cookies
  if (Cookies.get('cookiesAccepted') == 'true') {
    Cookies.set('tictactoeStates', states);
    Cookies.set('playerX', playerX);
    Cookies.set('playerO', playerO);
  }
  // reset all the boxes to their beginning state
  $.each($allBoxes, function(i, item) {
    $(this).html('');
    $(this).removeClass('filled');
    $(this).removeClass('win');
    // reset the win span to show the current player
    $winStateSpan.html(`<span id='current_player'>${currentPlayer}</span> ist am Zug`);
  });
}