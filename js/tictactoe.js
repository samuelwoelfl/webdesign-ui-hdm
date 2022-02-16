let $winStateSpan, $countXSpan, $countOSpan, $currentPlayerSpan;

let $allBoxes;
let states = [];
let playerX = [];
let playerO = [];

let countX = 0;
let countO = 0;

let currentPlayer = "X";

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


$(document).ready(function() {
  $winStateSpan = $("#win_state");
  $countXSpan = $("#countX");
  $countOSpan = $("#countO");
  $currentPlayerSpan = $("#current_player");

  $currentPlayerSpan.html(currentPlayer);

  $allBoxes = $(".box");
  // updateStates();

  $allBoxes.click(function() {
    if (!$(this).attr("class").includes("filled")) {
      $(this).html(currentPlayer);
      $(this).addClass('filled');
      index = $allBoxes.index($(this));

      updateStates(index);
      checkForWin();

      if (currentPlayer == "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      $currentPlayerSpan.html(currentPlayer);
    }
  });

});


function updateStates(index) {
  states = [];
  $.each($allBoxes, function(i, item) {
    states.push($(this).html())
  });

  if (index != undefined) {
    if (currentPlayer == "X") {
      playerX.push(index);
    } else {
      playerO.push(index);
    }
  }

}


function updateCount() {
  $countXSpan.html(countX);
  $countOSpan.html(countO);
}


function checkForWin() {
  for (let i in winCombinations) {
    c = winCombinations[i];
    if (playerX.includes(c[0]) && playerX.includes(c[1]) && playerX.includes(c[2])) {
      $winStateSpan.html("X wins");
      highlightWin(c);
      countX += 1;
      updateCount();
      setTimeout(function() {
        reset();
      }, 2000);
      break
    } else if (playerO.includes(c[0]) && playerO.includes(c[1]) && playerO.includes(c[2])) {
      $winStateSpan.html("O wins");
      highlightWin(c);
      countO += 1;
      updateCount();
      setTimeout(function() {
        reset();
      }, 2000);
      break
      // TODO: Wnn man mit den letzten gewinnt kommt, dass es unentschieden ist
      // ist gefixt aber man kann jetzt nicht mehr unentschieden machen ^^
      // Die anzeige oben wer dran ist funktioniert nicht
    } else if (i == (winCombinations.length - 1) && !states.includes("")) {
      $winStateSpan.html("Unentschieden");
      setTimeout(function() {
        reset();
      }, 2000);
      break
    }
  }
}


function highlightWin(combination) {
  $.each(combination, function(i, item) {
    $($allBoxes[this]).addClass("win");
  });
}


function reset() {
  states = [];
  playerX = [];
  playerO = [];
  $.each($allBoxes, function(i, item) {
    $(this).html("");
    $(this).removeClass("filled");
    $(this).removeClass("win");
    $winStateSpan.html(`<span id="current_player">${currentPlayer}</span> ist am Zug`);
  });
}