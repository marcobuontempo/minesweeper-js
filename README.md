# Minesweeper JS

## Description
Minesweeper JS is a small project built primarily for my own educational purpose. It has been created with Javascript to handle most of the logic, while HTML and CSS were used to structure and present the game visually.
\
I built this game entirely using my knowledge, using a few hints to assist along the way. Therefore, it is not intended to be the most-efficient, perfect, or even most-logical version of Minesweeper available.

## How to use?
The game is built as a web application, and can be run directly in the browser. It is hosted on GitHub pages, and can be accessed directly [here](https://marcobuontempo.github.io/minesweeper-js/)!

## Features
- ### ***User Options to Create the Board***:
    - Rows
        - Min: 2
        - Max: 20
        - Increment: 1
    - Columns
        - Min: 2
        - Max: 20
        - Increment: 1
    - Mines
        - Min: 1
        - Max: Board size - 1 *(so that there is always 1 valid tile able to be clicked)*
        - Increment: 1
    - Timer
        - Min: 10 seconds
        - Max: 10 minutes
        - Increment: 10 seconds
    - Preset Settings
        - Beginner (5, 5, 5, 1:30)
        - Intermediate (10, 10, 24, 5:00)
        - Expert (15, 15, 50, 8:00)
        - Crazy (20, 20, 200, 10:00)

- ### ***Game Timer***:
    - A countdown timer will begin when the game is started
    - When the timer reaches 0, the game will end

- ### ***Tile Values & Reveals***:
    - Blank Tiles
        - no surrounding tiles have a mine
        - on-click, all connected blank tiles will be revealed. This creates the effect that a large section of the board is revealed, with that section having a boarder of "numbered" tiles
    - Numbered Tiles 
        - a number of surrounding tiles have a mine (1-8)
        - on-click, the tile itself will reveal
    - Mine Tiles
        - the tile has a mine itself
        - on-click, the tile itself will reveal

- ### ***Flagging***:
    - Right-clicking a tile will allow a user to flag (i.e. mark) it, to indicate that it has a suspected mine
    - Right-clicking an already flagged tile will remove the flag
    - For every tile flagged, the "Remaining Mines" counter at the top will reduce by 1. This counter is able to reach a negative value
    - Flagged tiles do not change anything else about the tile, other than the flag marking it shows. A user may still reveal a flagged tile

- ### ***Game State***:
    - In-Progress
        - User will be able to select another tile to reveal
    - Game Over
        - Triggered when either:
            - All valid tiles are revealed
            - A single mine is reveale
            - When the timer reaches 0
        - A basic statistics panel will also display at the end:
            - Game over message ("Winner!" / "Try Again!" / "Time Up!")
            - Total number of tiles revealed
            - Total number of tiles that were flagged
            - Total time remaining on the countdown
        - Users will be prompted with a "Play Again" button, to refresh the page and return to the User Options

## ***Design***:
- The board data is stored as an array, where each item represents a tile. For example, a 2x3 board would look like: 
    ````
    [ Tile1, Tile2,
      Tile3, Tile4,
      Tile5, Tile6 ]
    ````

- Each tile in the array is presented as an object, which has data such as the number of surrounding mines, or whether the tile itself has a mine. Example:
    ```` 
        {
            id: 1,
            mine: false,
            flag: false,
            surroundingMines: 2
        }
    ````
- A series of functions will populate the board data based on the user's input settings. For example:
    - The board size will be calculated (width*height), and will create an array with as many tiles
    - Mines will be randomly assigned to tiles, etc.
- To reference a tile from another one, a series of basic equations are used. For example:
    - To check a tile to the right, it would be calculated using ````current tile index+ 1````
    - To check a tile to down-left, it would be calculated using ````current tile index - board width - 1````
- The equations above are used for both:
    - Calculating the number of surrounding mines on a tile
    - Checking the surrounding tiles when clicking a blank tile
- A board is presented as a CSS grid. This allows it to be dynamically displayed, as the ````grid-columns```` and ````grid-rows```` are changed according to the user's input of columns and rows. Each tile is also assigned it's position in the grid, similarly, using some basic equations. NOTE: it displays the tile array in reverse order. For example:
    ````
    7, 8, 9
    4, 5, 6
    1, 2, 3
    ````
- To reveal blank tiles, all of the surrounding tiles of the clicked tile are checked:
    - If the tile is numbered, it will reveal the tile
    - If the tile is blank, it will add this to an array of "unchecked tiles"
    - If the tile is a mine, it will be ignored
    - Finally, it will repeat this check of surrounding tiles to each "unchecked tile", until there are none left (i.e. all the numbered tiles surrounding the initially clicked tile is displayed)


## Support
There are no intentions to add anything major onto this existing project in the future, apart from some potential styling changes. Although if there are any bugs encountered, please let me know :)

## Usage
Feel free to re-use this code, re-distribute the project, or fork this [repository](https://github.com/marcobuontempo/minesweeper-js) for any purpose without my explicit permission

## Author
*Marco Buontempo (2021)*