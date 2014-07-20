function GameOfLife(width, height) {
  this.width = width;
  this.height = height;
};

GameOfLife.prototype.createAndShowBoard = function() {
  // create <table> element
  var golTable = document.createElement('tbody');

  // build Table HTML
  var tableHtml = '';
  for (var h = 0; h < this.height; h++) {
    tableHtml += "<tr id='row+" + h + "'>";
    for (var w = 0; w < this.width; w++) {
      tableHtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>"
    }
    tableHtml += "</tr>"
  }
  golTable.innerHTML = tableHtml;

  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(golTable);

  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  /*
  each board cell has a CSS id in the format of: "x-y"
  where x is the x-coordinate and y is the y-coordinate.
  use this fact to loop through all the ids and assign them 'on-click'
  events that allow a user to click on cells to setup the initial state of the game
  before clicking "Step" or "Auto-Play"

  clicking on a cell should toggle the cell between "alive" & "dead"
  for example: an "alive" cell be colored "green", a dead cell could stay "white"
  */

  var onCellClick = function() {
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-'),
      coord_hash = {
        x: coord_array[0],
        y: coord_array[1]
      };

    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = 'alive';
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = 'dead';
      this.setAttribute('data-status', 'dead');
    }
  };

  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event just the 0-0 cell
  // You need to add the click event on EVERY cell on the board

  // var cell00 = document.getElementById('0-0');
  // cell00.onclick = onCellClick;
};

GameOfLife.prototype.step = function() {
  /*
  here is where you want to loop through all the cells
  on the board and determine, based on it's neighbors,
  whether the cell should be dead-or alive in the next
  evoltion of the game
  */
};

GameOfLife.prototype.enableAutoPlay = function() {
  // Start Auto-Play by running the 'step' function
  // automatically repeated every fixed time interval
};

var gameOfLife = new GameOfLife(20, 20);
gameOfLife.createAndShowBoard();