// ===========Main App
function GameOfLife(width, height) {
  this.width = width;
  this.height = height;
  this.intervalId;
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

GameOfLife.prototype.forEachCell = function(func) {
  var width = this.width,
    height = this.height;
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      func(document.getElementById(x + '-' + y));
    }
  }
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
        x: parseInt(coord_array[0], 10),
        y: parseInt(coord_array[1], 10)
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

  // LOOP FOR EVERY CELL
  this.forEachCell(function(cell) {
    cell.onclick = onCellClick;
  });
};

GameOfLife.prototype.step = function() {
  /*
  here is where you want to loop through all the cells
  on the board and determine, based on it's neighbors,
  whether the cell should be dead-or alive in the next
  evoltion of the game
  */

  // Function to check the number of neighbors. Takes a cell element
  var checkNumOfNeighbors = function(cell) {
    var numOfNeighbors = 0,
      coord_array = cell.id.split('-'),
      coord_hash = {
        x: coord_array[0],
        y: coord_array[1]
      };

    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        var surroundCellCoord = {
          x: parseInt(coord_hash['x'], 10) + x,
          y: parseInt(coord_hash['y'], 10) + y
        };
        // console.log(surroundCellCoord);
        if (x !== 0 || y !== 0) {
          var surroundCell = document.getElementById(surroundCellCoord['x'] + '-' + surroundCellCoord['y']);

          if (surroundCell !== null) {
            if (surroundCell.getAttribute('data-status') == 'alive') {
              numOfNeighbors++;
            }
          }
        }
      }
    }


    return numOfNeighbors;
  };

  // Loop through all cells and check number of neighbors each cell has
  var cellNeighborsData = {};

  this.forEachCell(function(cell) {
    cellNeighborsData[cell.id] = {};

    cellNeighborsData[cell.id]['data-status'] = cell.getAttribute('data-status');
    cellNeighborsData[cell.id]['neighbors'] = checkNumOfNeighbors(cell);
  });

  // Loop through all alive cells and make it dead if it has fewer than 2 or move than 3 neighbors
  // Loop through all dead cells and make it alive if it has 3 neighbors
  this.forEachCell(function(cell) {
    var cellData = cellNeighborsData[cell.id];
    var cellDataStatus = cellData['data-status'];
    var cellDataNeighbors = cellData['neighbors'];

    if (cellDataStatus === 'alive') {
      if (cellDataNeighbors < 2 || cellDataNeighbors > 3) {
        cell.setAttribute('data-status', 'dead');
        cell.className = 'dead';
      }
    } else if (cellDataStatus === 'dead') {
      if (cellDataNeighbors === 3) {
        cell.setAttribute('data-status', 'alive');
        cell.className = 'alive';
      }
    }
  });
};

GameOfLife.prototype.enableAutoPlay = function() {
  // Start Auto-Play by running the 'step' function
  // automatically repeated every fixed time interval
  if (typeof this.intervalId == 'undefined') {
    var self = this;
    this.intervalId = setInterval(function() {
      self.step();
    }, 300);
    this.autoPlay = true;
  } else {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

GameOfLife.prototype.clearTable = function() {
  this.forEachCell(function(cell) {
    cell.setAttribute('data-status', 'dead');
    cell.className = 'dead';
  });
};


// ==========Initialization
var gameOfLife = new GameOfLife(20, 20);
gameOfLife.createAndShowBoard();

//======Click Event Listener
var dom = {
  'width': document.getElementById('width'),
  'height': document.getElementById('height'),
  'make-table': document.getElementById('make-table'),
  'step': document.getElementById('step'),
  'auto-play': document.getElementById('auto-play'),
  'reset': document.getElementById('reset'),
  'clear': document.getElementById('clear'),
  'warning': document.getElementById('warning')
};

dom['step'].onclick = function() {
  gameOfLife.step();
};

dom['auto-play'].onclick = function() {
  var autoBtn = dom['auto-play'];

  if (autoBtn.innerHTML === 'Auto-Play') {
    autoBtn.innerHTML = 'Pause';
  } else {
    autoBtn.innerHTML = 'Auto-Play';
  }

  gameOfLife.enableAutoPlay();
};

dom['clear'].onclick = function() {
  gameOfLife.clearTable();
};

dom['make-table'].onclick = function() {
  var width = dom['width'].value,
    height = dom['height'].value;

  var showWarning = function(warning) {
    dom['warning'].innerHTML = warning;
    dom['warning'].style.visibility = 'visible';
  };

  var hideWarning = function() {
    dom['warning'].style.visibility = 'hidden';
  };

  if (width !== '' && height !== '') {
    if (width < 20 || height < 20 || width > 40 || height > 40) {
      showWarning('Please make table between 20 x 20 or 40 x 40!');
      setTimeout(hideWarning, 3000);
    } else {
      gameOfLife = new GameOfLife(parseInt(width, 10), parseInt(height, 10));

      var board = document.getElementById('board');
      var tbody = document.getElementsByTagName('tbody')[0];

      board.removeChild(tbody);
      gameOfLife.createAndShowBoard();
    }
  } else {
    showWarning('Please specify table width & height!');
  }
};

dom['reset'].onclick = function() {
  gameOfLife = new GameOfLife(20, 20);

  var board = document.getElementById('board');
  var tbody = document.getElementsByTagName('tbody')[0];

  board.removeChild(tbody);
  gameOfLife.createAndShowBoard();
};