#Game of Life - 2D
Based on Fullstack Academy Game of Life (https://github.com/FullstackAcademy/game-of-life)

##Rules
The game of life is played on a 2-d board (think 2d array), where each cell has two possible state

* Any live cell with two or three live neighbors lives on to the next generation.
* Any live cell with fewer than two live neighbors dies, as if caused by under-population.
* Any live cell with more than three live neighbors dies, as if by overcrowding.
* Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

##Languages & Libraries
####HTML 5

####CSS 3
* Bootstrap (http://getbootstrap.com/)
* Bootstrap Jumboton Narrow (http://getbootstrap.com/examples/jumbotron-narrow/)
* Flat UI for Bootstrap (http://designmodo.github.io/Flat-UI/)

###JavaScipt

##Architecture
####Model & Controller
Using a class constructor named GameOfLife.  Put all the data and game logic inside this class.

####View
Using an object named `dom`.  Put all the DOM related data and function inside this object.  all DOM data will have this syntax `dom['input']`.