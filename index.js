class MinesweeperBoard {
    constructor(width, height, mines) {
        this.options = {
            width,
            height,
            mines
        },

        this.boardSize = this.options.width * this.options.height,
        this.board = [],
        this.checkedTiles = [],
        this.flaggedTiles = 0,
        this.gameInProgress = true;
    }


    // Finds and returns a tile object, relative to the input
    checkDirection(i,direction) {
        if(direction == "right") {
            return this.board[i+1];
        }
        if(direction == "left") {
            return this.board[i-1]; 
        }
        if(direction == "up") {
            return this.board[i+this.options.width];
        }
        if(direction == "down") {
            return this.board[i-this.options.width];
        }
        if(direction == "upleft") {
            return this.board[i+this.options.width-1];
        }
        if(direction == "upright") {
            return this.board[i+this.options.width+1];
        }
        if(direction == "downleft") {
            return this.board[i-this.options.width-1];
        }
        if(direction == "downright") {
            return this.board[i-this.options.width+1];
        }
    }

    // Calculates how many mines are surrounding the input tile
    checkSurroundingMines(i) {
        let totalSurrounding = 0;

        const tileRight = this.checkDirection(i,"right");
        const tileLeft = this.checkDirection(i,"left");
        const tileUp = this.checkDirection(i,"up");
        const tileUpLeft = this.checkDirection(i,"upleft");
        const tileUpRight = this.checkDirection(i,"upright");
        const tileDown = this.checkDirection(i,"down");
        const tileDownLeft = this.checkDirection(i,"downleft");
        const tileDownRight = this.checkDirection(i,"downright");


        // FOR TILES NOT IN END COLUMNS
        if(!(i % this.options.width === 0) && !(i % this.options.width === this.options.width-1)) {
            // Check right
            tileRight.mine && totalSurrounding++;
            // Check left
            tileLeft.mine && totalSurrounding++;
            // For tiles not in bottom or top row
            if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-left
                tileUpLeft.mine && totalSurrounding++;
                // Check up-right
                tileUpRight.mine && totalSurrounding++;
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-left
                tileDownLeft.mine && totalSurrounding++;
                // Check down-right
                tileDownRight.mine && totalSurrounding++;
            }
            // For tiles in bottom row
            if(!(i > this.options.width-1)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-left
                tileUpLeft.mine && totalSurrounding++;
                // Check up-right
                tileUpRight.mine && totalSurrounding++;
            }
            // For tiles in top row
            if(!(i < this.boardSize-this.options.width)) {
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-left
                tileDownLeft.mine && totalSurrounding++;
                // Check down-right
                tileDownRight.mine && totalSurrounding++;
            }
        }
        // FOR TILES IN LEFT COLUMN
        if(i % this.options.width === 0) {
            // Check right
            tileRight.mine && totalSurrounding++;
            // For tiles not in bottom or top row
            if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-right
                tileUpRight.mine && totalSurrounding++;
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-right
                tileDownRight.mine && totalSurrounding++;
            }   
            // For tiles in bottom row
            if(!(i > this.options.width-1)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-right
                tileUpRight.mine && totalSurrounding++;
            }
            // For tiles in top row
            if(!(i < this.boardSize-this.options.width)) {
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-right
                tileDownRight.mine && totalSurrounding++;
            }
        }
        // FOR TILES IN RIGHT COLUMN
        if(i % this.options.width === this.options.width-1) {
            // Check left
            tileLeft.mine && totalSurrounding++;
            // For tiles not in bottom or top row
            if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-left
                tileUpLeft.mine && totalSurrounding++;
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-left
                tileDownLeft.mine && totalSurrounding++;
            }   
            // For tiles in bottom row
            if(!(i > this.options.width-1)) {
                // Check up
                tileUp.mine && totalSurrounding++;
                // Check up-left
                tileUpLeft.mine && totalSurrounding++;
            }
            // For tiles in top row
            if(!(i < this.boardSize-this.options.width)) {
                // Check down
                tileDown.mine && totalSurrounding++;
                // Check down-left
                tileDownLeft.mine && totalSurrounding++;
            }
        }

        return totalSurrounding;
    }


    // Checks the surrounding tiles around the input tile. If the surrounding tile is a:
        // - Mine: Ignores this tile
        // - Numbered tile (i.e. has a surrounding tile value >1): Move this to a "checked tiles" array
        // - Blank tile (i.e. has surrounding tile value of 1): Move this to an "unchecked tiles" array
        // Note: This function will continuously loop until there are no "unchecked tiles" left. So if a "blank" tile is input, it will reveal all surrounding tiles until the border is made up of "numbered" tiles
    checkSurroundingSafeTiles(tileId) {                
        
        let checkedTiles = this.checkedTiles;
        
        // Initialise unchecked tiles array with the input tile to check
        let uncheckedTiles = [tileId];
        
        // Keep looping until no unchecked tiles left
        while(uncheckedTiles.length > 0) {
            uncheckedTiles.forEach((i,index) => {
                // During each iteration, push the current tile to the "checked" array, and remove from "unchecked" array (as it has now been checked)
                checkedTiles.push(i);
                
                const newUncheckedTiles = [];
                uncheckedTiles.splice(index,1);

                // Get values for surrounding tiles
                const tileRight = this.checkDirection(i,"right");
                let tileRightSurrounding = 0;
                let tileRightMine  = 0;
                let tileRightId = 0;
                    if(tileRight) {
                        tileRightMine = tileRight.mine;
                        if(!tileRightMine) {
                            tileRightSurrounding = tileRight.surroundingMines;
                            tileRightId = tileRight.id;
                        }
                    }

                const tileLeft = this.checkDirection(i,"left");
                let tileLeftSurrounding = 0;
                let tileLeftMine = 0;
                let tileLeftId = 0;
                    if(tileLeft) {
                        tileLeftMine = tileLeft.mine;
                        if(!tileLeftMine) {
                            tileLeftSurrounding = tileLeft.surroundingMines;
                            tileLeftId = tileLeft.id;
                        }
                    }

                const tileUp = this.checkDirection(i,"up");
                let tileUpSurrounding = 0;
                let tileUpMine = 0;
                let tileUpId = 0;
                    if(tileUp) {
                        tileUpMine = tileUp.mine;
                        if(!tileUpMine) {
                            tileUpSurrounding = tileUp.surroundingMines;
                            tileUpId = tileUp.id;
                        }
                    }

                const tileUpLeft = this.checkDirection(i,"upleft");
                let tileUpLeftSurrounding = 0;
                let tileUpLeftMine = 0;
                let tileUpLeftId = 0;
                    if(tileUpLeft) {
                        tileUpLeftMine = tileUpLeft.mine;
                        if(!tileUpLeftMine) {
                            tileUpLeftSurrounding = tileUpLeft.surroundingMines;
                            tileUpLeftId = tileUpLeft.id;
                        }
                    }

                const tileUpRight = this.checkDirection(i,"upright");
                let tileUpRightSurrounding = 0;
                let tileUpRightMine = 0;
                let tileUpRightId = 0;
                    if(tileUpRight) {
                        tileUpRightMine = tileUpRight.mine;
                        if(!tileUpRightMine) {
                            tileUpRightSurrounding = tileUpRight.surroundingMines;
                            tileUpRightId = tileUpRight.id;
                        }
                    }

                const tileDown = this.checkDirection(i,"down");
                let tileDownSurrounding = 0;
                let tileDownMine = 0;
                let tileDownId = 0;
                    if(tileDown) {
                        tileDownMine = tileDown.mine;
                        if(!tileDownMine) {
                            tileDownSurrounding = tileDown.surroundingMines;
                            tileDownId = tileDown.id;
                        }
                    }

                const tileDownLeft = this.checkDirection(i,"downleft");
                let tileDownLeftSurrounding = 0;
                let tileDownLeftMine = 0;
                let tileDownLeftId = 0;
                    if(tileDownLeft) {
                        tileDownLeftMine = tileDownLeft.mine;
                        if(!tileDownLeftMine) {
                            tileDownLeftSurrounding = tileDownLeft.surroundingMines;
                            tileDownLeftId = tileDownLeft.id;
                        }
                    }

                const tileDownRight = this.checkDirection(i,"downright");
                let tileDownRightSurrounding = 0;
                let tileDownRightMine = 0;
                let tileDownRightId = 0;
                    if(tileDownRight) {
                        tileDownRightMine = tileDownRight.mine;
                        if(!tileDownRightMine) {
                            tileDownRightSurrounding = tileDownRight.surroundingMines;
                            tileDownRightId = tileDownRight.id;
                        }
                    }

                
                // FOR TILES NOT IN END COLUMNS
                if(!(i % this.options.width === 0) && !(i % this.options.width === this.options.width-1)) {
                    // Check right
                    tileRightSurrounding ? checkedTiles.push(tileRightId) : newUncheckedTiles.push(tileRightId);
                    // Check left
                    tileLeftSurrounding ? checkedTiles.push(tileLeftId) : newUncheckedTiles.push(tileLeftId);
                    // For tiles not in bottom or top row
                    if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-left
                        tileUpLeftSurrounding ? checkedTiles.push(tileUpLeftId) : newUncheckedTiles.push(tileUpLeftId);
                        // Check up-right
                        tileUpRightSurrounding ?checkedTiles.push(tileUpRightId) : newUncheckedTiles.push(tileUpRightId);
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-left
                        tileDownLeftSurrounding ? checkedTiles.push(tileDownLeftId) : newUncheckedTiles.push(tileDownLeftId);
                        // Check down-right
                        tileDownRightSurrounding ? checkedTiles.push(tileDownRightId) : newUncheckedTiles.push(tileDownRightId);
                    }
                    // For tiles in bottom row
                    if(!(i > this.options.width-1)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-left
                        tileUpLeftSurrounding ? checkedTiles.push(tileUpLeftId) : newUncheckedTiles.push(tileUpLeftId);
                        // Check up-right
                        tileUpRightSurrounding ? checkedTiles.push(tileUpRightId) : newUncheckedTiles.push(tileUpRightId);
                    }
                    // For tiles in top row
                    if(!(i < this.boardSize-this.options.width)) {
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-left
                        tileDownLeftSurrounding ? checkedTiles.push(tileDownLeftId) : newUncheckedTiles.push(tileDownLeftId);
                        // Check down-right
                        tileDownRightSurrounding ? checkedTiles.push(tileDownRightId) : newUncheckedTiles.push(tileDownRightId);
                    }
                }
                // FOR TILES IN LEFT COLUMN
                if(i % this.options.width === 0) {
                    // Check right
                    tileRightMine ? checkedTiles.push(tileRightId) : newUncheckedTiles.push(tileRightId);
                    ;
                    // For tiles not in bottom or top row
                    if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-right
                        tileUpRightSurrounding ? checkedTiles.push(tileUpRightId) : newUncheckedTiles.push(tileUpRightId);
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-right
                        tileDownRightSurrounding ? checkedTiles.push(tileDownRightId) : newUncheckedTiles.push(tileDownRightId);
                    }   
                    // For tiles in bottom row
                    if(!(i > this.options.width-1)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-right
                        tileUpRightSurrounding ? checkedTiles.push(tileUpRightId) : newUncheckedTiles.push(tileUpRightId);
                    }
                    // For tiles in top row
                    if(!(i < this.boardSize-this.options.width)) {
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-right
                        tileDownRightSurrounding ? checkedTiles.push(tileDownRightId) : newUncheckedTiles.push(tileDownRightId);
                    }
                }
                // FOR TILES IN RIGHT COLUMN
                if(i % this.options.width === this.options.width-1) {
                    // Check left
                    tileLeftSurrounding ? checkedTiles.push(tileLeftId) : newUncheckedTiles.push(tileLeftId);
                    // For tiles not in bottom or top row
                    if((i > this.options.width-1) && (i < this.boardSize-this.options.width)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-left
                        tileUpLeftSurrounding ? checkedTiles.push(tileUpLeftId) : newUncheckedTiles.push(tileUpLeftId);
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-left
                        tileDownLeftSurrounding ? checkedTiles.push(tileDownLeftId) : newUncheckedTiles.push(tileDownLeftId);
                    }   
                    // For tiles in bottom row
                    if(!(i > this.options.width-1)) {
                        // Check up
                        tileUpSurrounding ? checkedTiles.push(tileUpId) : newUncheckedTiles.push(tileUpId);
                        // Check up-left
                        tileUpLeftSurrounding ? checkedTiles.push(tileUpLeftId) : newUncheckedTiles.push(tileUpLeftId);
                    }
                    // For tiles in top row
                    if(!(i < this.boardSize-this.options.width)) {
                        // Check down
                        tileDownSurrounding ? checkedTiles.push(tileDownId) : newUncheckedTiles.push(tileDownId);
                        // Check down-left
                        tileDownLeftSurrounding ? checkedTiles.push(tileDownLeftId) : newUncheckedTiles.push(tileDownLeftId);
                    }
                }


                // Verify tile is not already in "unchecked" or "checked array", and push to "unchecked" if it is unique
                newUncheckedTiles.forEach(newTile => {
                        let match = false;
                        uncheckedTiles.forEach(existingUnchecked => {
                            if(newTile == existingUnchecked) {
                                match = true;
                            }
                        });
                        checkedTiles.forEach(existingChecked => {
                            if(newTile == existingChecked) {
                                match = true;
                            }
                        })
                        if(!match) {
                            uncheckedTiles.push(newTile);
                        }
                })

            })

        }
        return checkedTiles;
    }
    

    // Populates an array to represent each tile on the board
    createBoard() {
        // Create board
        for(let i=0; i<this.boardSize; i++) {            
            const tile = {
                id: i,
                mine: false,
                flag: false,
                surroundingMines: 0
            }
            this.board.push(tile);
        }
        // Assign random mines
        let assignedMines = 0;
        while(assignedMines < this.options.mines) {
            const i = Math.floor(Math.random()*this.boardSize);
            if(!this.board[i].mine) {
                this.board[i].mine = true;
                assignedMines++;
            }
        }
        // Count how many surrounding mines for each tile
        for(let i=0; i<this.boardSize; i++) {
            this.board[i].surroundingMines = this.checkSurroundingMines(i);
        }
    }


    // Create HTML to display game
    renderGame() {
        // Show total number of mines
        document.querySelector("#remaining-mines").innerHTML = this.options.mines;

        // Create Board Tiles
        this.createBoard();
        
        // Change DOM to correct grid size
        const minesweeperBoard = document.querySelector("#minesweeper-board");
        minesweeperBoard.style.gridTemplateColumns = this.options.width;
        minesweeperBoard.style.gridTemplateRows = this.options.height;

        // Create array of HTML tiles to render
        let html = [];
        for(let i=0; i<this.boardSize; i++) {
            const hasColumn = Math.floor(i%this.options.width)+1;
            const hasRow = Math.abs(Math.floor(i/this.options.width)-10);
            const hasMine = this.board[i].mine;
            const hasSurroundingMines = (this.board[i].surroundingMines > 0  &&  !hasMine) ? this.board[i].surroundingMines : "";
            const tileHtml = 
            `<div class="tile" style="grid-column: ${hasColumn}; grid-row: ${hasRow};" data-tile-number=${i}>
                <span class="surrounding-mines">${hasSurroundingMines}</span>
            </div>`;
            html.push(tileHtml);
        }

        // Join HTML tiles and render with DOM
        minesweeperBoard.innerHTML = html.join("");
    }

    gameOver (win) {
        const gameStats = document.querySelector("#game-stats");
        const gameResult = document.querySelector("#game-result");
        const totalChecked = document.querySelector("#total-checked");
        const totalFlagged = document.querySelector("#total-flagged");
        const totalTime = document.querySelector("#total-time");
        const gameCounter = document.querySelector("#game-counter");
        const gameBoard = document.querySelector("#minesweeper-board");

        if(win == "Win") {
            gameResult.innerHTML = "Winner!";
            totalTime.innerHTML = document.querySelector("#remaining-time").innerHTML;
        } else if (win == "Lose") {
            gameResult.innerHTML = "Try Again!";
            totalTime.innerHTML = document.querySelector("#remaining-time").innerHTML;
        } else if (win == "Time Up" && this.gameInProgress) {
            gameResult.innerHTML = "Time Up!";
            totalTime.innerHTML = "0:00";
        }
        totalChecked.innerHTML = document.querySelectorAll(".tile-checked").length;
        totalFlagged.innerHTML = this.flaggedTiles;
        gameCounter.style.visibility = "hidden";
        gameStats.style.display = "flex";
        gameBoard.style.filter = "blur(1px)";
        document.querySelectorAll(".tile").forEach(tile => tile.style.cursor = "default");
        this.gameInProgress = false;
    }

}




// Show valid mine quantity per the current board size options
function currentBoardSizeSelected () {
    const columns = Number(document.querySelector("#input-columns").value);
    const rows = Number(document.querySelector("#input-rows").value); 
    return columns*rows;
}

function currentTimerSelected () {
    const timerInput = Number(document.querySelector("#input-timer").value);

    const minutes = Math.floor(timerInput / 60);
    const seconds = Math.round(((timerInput / 60) - minutes) * 60);
    
    document.querySelector("#current-timer").innerHTML = `${minutes >= 10 ? minutes : "0"+minutes}:${seconds >= 10 ? seconds : "0"+seconds}`;
}
currentTimerSelected();



// Display initial user input settings values
document.querySelector("#board-size").innerHTML = currentBoardSizeSelected();
document.querySelector("#current-rows").innerHTML = document.querySelector("#input-rows").value;
document.querySelector("#current-columns").innerHTML = document.querySelector("#input-columns").value;
document.querySelector("#current-mines").innerHTML = document.querySelector("#input-mines").value;
document.querySelector("#input-mines").max = currentBoardSizeSelected()-1;

// Update display or range values when user options are adjusted
document.querySelector("#input-rows").addEventListener("change", () => {
    const boardSize = currentBoardSizeSelected();
    const rows = document.querySelector("#input-rows").value;
    document.querySelector("#board-size").innerHTML = boardSize;
    document.querySelector("#input-mines").max = boardSize-1;
    document.querySelector("#current-mines").innerHTML = document.querySelector("#input-mines").value;
    document.querySelector("#current-rows").innerHTML = rows;
});
document.querySelector("#input-columns").addEventListener("change", () => {
    const boardSize = currentBoardSizeSelected();
    const columns = document.querySelector("#input-columns").value;
    document.querySelector("#board-size").innerHTML = boardSize;
    document.querySelector("#input-mines").max = boardSize-1;
    document.querySelector("#current-mines").innerHTML = document.querySelector("#input-mines").value;
    document.querySelector("#current-columns").innerHTML = columns;
});
document.querySelector("#input-mines").addEventListener("change", () => {
    document.querySelector("#current-mines").innerHTML = document.querySelector("#input-mines").value;
});
document.querySelector("#input-timer").addEventListener("change", () => {
    currentTimerSelected();
});


// Preset Game Difficulties
document.querySelectorAll(".preset-difficulty").forEach(option => option.addEventListener(
    "click", (e) => {
    const difficulty = e.target.id;
    const columns = document.querySelector("#input-columns");
    const rows = document.querySelector("#input-rows");
    const mines = document.querySelector("#input-mines");
    const seconds = document.querySelector("#input-timer");

    if (difficulty == "beginner-preset") {
        columns.value = 5;
        rows.value = 5;
        mines.max = currentBoardSizeSelected()-1;
        mines.value = 5;
        seconds.value = 90;
    } else if (difficulty == "intermediate-preset") {
        columns.value = 10;
        rows.value = 10;
        mines.max = currentBoardSizeSelected()-1;
        mines.value = 10;
        seconds.value = 60;
    } else if (difficulty == "expert-preset") {
        columns.value = 15;
        rows.value = 15;
        mines.max = currentBoardSizeSelected()-1;
        mines.value = 50;
        seconds.value = 480;
    } else if (difficulty == "crazy-preset") {
        columns.value = 20;
        rows.value = 20;
        mines.max = currentBoardSizeSelected()-1;
        mines.value = 200;
        seconds.value = 600;
    }

    document.querySelector("#board-size").innerHTML = currentBoardSizeSelected();
    document.querySelector("#current-rows").innerHTML = document.querySelector("#input-rows").value;
    document.querySelector("#current-columns").innerHTML = document.querySelector("#input-columns").value;
    document.querySelector("#current-mines").innerHTML = mines.value;
    currentTimerSelected();
}))



// Validate game options
function validateGameOptions (columns, rows, mines, seconds) {
    const message = "Please enter valid options";
    const errorMessage = document.querySelector("#error-message");
    const boardSize = columns*rows;

    if(columns < 2 || columns > 20 || 
        rows < 2 || rows > 20 || 
        mines < 1 || mines > boardSize ||
        seconds < 0) {
        errorMessage.innerHTML = message;
        return false;
    }
    return true;
}





// Function to call to start the game
function startGame () {
    // Get user input options
    const columns = Number(document.querySelector("#input-columns").value);
    const rows = Number(document.querySelector("#input-rows").value);
    const mines = Number(document.querySelector("#input-mines").value);
    const seconds = Number(document.querySelector("#input-timer").value);

    

    if(validateGameOptions(columns, rows, mines, seconds)) {     // Only create game if inputs are valid
        // Hide input options and show game board
        document.querySelector("#game-options").style.display = "none";
        document.querySelector("#game-container").style.display = "flex";


        // Create the board and display it
        const game = new MinesweeperBoard(columns,rows,mines);
        game.renderGame();


        // Display starting time
        const timeDisplay = document.querySelector("#remaining-time");
        let timeRemaining = seconds;
        timeDisplay.innerHTML = `${Math.floor(timeRemaining/60)}:${timeRemaining%60 < 10 ? "0"+timeRemaining%60 : timeRemaining%60}`;

        // Countdown Game Timer
        function gameTimer () {
            const seconds = Number(document.querySelector("#input-timer").value);
            const timeDisplay = document.querySelector("#remaining-time");
            let timeRemaining = seconds;
            const countDown = setInterval(() => {
                // Update timer every second (by reducing value by 1s)
                timeRemaining -= 1;
                timeDisplay.innerHTML = `${Math.floor(timeRemaining/60)}:${timeRemaining%60 < 10 ? "0"+timeRemaining%60 : timeRemaining%60}`;
                // Make timer orange when time low
                if(timeRemaining <= 10) {
                    timeDisplay.classList.add("low-time");
                }
                // Make timer red when time is almost finished
                if(timeRemaining <= 3) {
                    timeDisplay.classList.add("critical-low-time");
                }
                // End game if timer runs out
                if(timeRemaining == 0) {
                    clearInterval(countDown);
                    game.gameOver("Time Up");
                }
            }, 1000);
        }

        // Start countdown timer
        gameTimer();


        // Handle Tile Click
        function handleTileClick(e) {
            const tileId = Number(e.target.dataset.tileNumber);
            if(game.board[tileId].mine) { // End game if tile is a mine
                document.querySelector(`[data-tile-number="${tileId}"`).classList.add("mine-checked");
                game.gameOver("Lose");
                document.querySelectorAll(".tile").forEach(tile => tile.removeEventListener("click", handleTileClick)); // Remove click function
                document.querySelectorAll(".tile").forEach(tile => tile.removeEventListener("contextmenu", handleFlagClick)); // Remove flag click function
            } else if (game.board[tileId].surroundingMines) { // Show tile if it has surrounding mines
                game.checkedTiles.push(tileId);
                document.querySelector(`[data-tile-number="${tileId}"`).classList.add("tile-checked");
            } else { // Expand all surrounding blank tiles until they have a number
                game.checkSurroundingSafeTiles(tileId);
                game.checkedTiles.forEach(tile => document.querySelector(`[data-tile-number="${tile}"`).classList.add("tile-checked"));
            }

            // Check win condition
            const tilesChecked = document.querySelectorAll(".tile-checked").length;
            const remainingTiles = game.boardSize - tilesChecked - game.options.mines;
            if(!remainingTiles) {
                game.gameOver("Win");
                document.querySelectorAll(".tile").forEach(tile => tile.removeEventListener("click", handleTileClick)); // Remove click function
                document.querySelectorAll(".tile").forEach(tile => tile.removeEventListener("contextmenu", handleFlagClick)); // Remove flag click function
            }
        };

        // Handle Flagging a Tile
        function handleFlagClick(e) {
            // Change appearance of flagged tile and update the total flagged tiles value
            const tileId = Number(e.target.dataset.tileNumber);
            const tile = document.querySelector(`[data-tile-number="${tileId}"`);
            tile.classList.contains("flagged") ? game.flaggedTiles-- : game.flaggedTiles++;
            tile.classList.toggle("flagged");

            // Update display of remaining mines
            const totalMines = game.options.mines - game.flaggedTiles;
            document.querySelector("#remaining-mines").innerHTML = totalMines;

            e.preventDefault(); // Stop right-click menu showing
        }

        // Interactivity to display a tile
        document.querySelectorAll(".tile").forEach(tile => tile.addEventListener("click", handleTileClick));

        // Interactivity to flag a tile
        document.querySelectorAll(".tile").forEach(tile => tile.addEventListener("contextmenu", handleFlagClick));

    }
} 



// "START GAME" BUTTON
document.querySelector("#start-game").addEventListener("click", startGame);

// "PLAY AGAIN?" BUTTON
document.querySelector("#new-game").addEventListener("click", () => window.location.reload());