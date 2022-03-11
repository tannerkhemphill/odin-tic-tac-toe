// Factory function that creates a gameboard object of a tic-tac-toe board
// consisting of an array of the 9 positions on the board
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    // Method to place an x or o symbol on a position of the board
    const move = (position, symbol) => {
        board[position] = symbol;
    }

    // Method to clear the board
    const clear = () => {
        board[0] = '';
        board[1] = '';
        board[2] = '';
        board[3] = '';
        board[4] = '';
        board[5] = '';
        board[6] = '';
        board[7] = '';
        board[8] = '';
    }

    // Method to check the status of the game to see if a player has won
    // or a tie has occured and return the result
    const checkGameStatus = () => {
        let gameOver = false;
        let result = '';
        if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
            gameOver = true;
            result = board[0];
        }
        else if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
            gameOver=true;
            result = board[3];
        }
        else if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
            gameOver=true;
            result = board[6];
        }
        else if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
            gameOver=true;
            result = board[0];
        }
        else if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
            gameOver=true;
            result = board[1];
        }
        else if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
            gameOver=true;
            result = board[2];
        }
        else if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
            gameOver=true;
            result = board[0];
        }
        else if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
            gameOver=true;
            result = board[2];
        }
        else if (board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' 
          && board[4] !== '' && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== '') {
              gameOver=true;
              result = 'D';
          }
        else {
            gameOver = false;
        }
        return [gameOver, result];
    };

    return {board, move, clear, checkGameStatus};
})();

// Factory function to crate a player object with a name and symbol
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

// Factory function to create an object to control the display of the board
// on the page via DOM
const displayController = (() => {
    let player1 = Player('1', 'X');
    let player2 = Player('2', 'O');

    let gameOver = false;
    let result = '';
    let player = player1;

    const button = document.querySelector('#restart');
    const display = document.querySelector('#display');

    const board = document.querySelector('#board');
    const squares = board.querySelectorAll('div');
    let square = Array.from(squares);

    // Method to display the board on the page
    const displayBoard = () => {
        for (let i = 0; i < square.length; i++) {
            square[i].textContent = gameBoard.board[i];
        }
    };

    // Method to change the player after each turn
    const changePlayer = (player) => {
        if (player === player1) {
            player = player2;
        }
        else {
            player = player1;
        }
        return player;
    };

    // Method to continuously change turns until a winner or tie is detected
    const playGame = () => {
        displayBoard();
        gameOver = gameBoard.checkGameStatus()[0];
        if (gameOver) {
            result = gameBoard.checkGameStatus()[1];
            if (result === 'X') {
                display.textContent = `${player1.getName()} (${player1.getSymbol()}) wins!`;
            }
            else if (result === 'O') {
                display.textContent = `${player2.getName()} (${player2.getSymbol()}) wins!`
            }
            else {
                display.textContent = "It's a draw!";
            }
        }
        else {
            player = changePlayer(player);
            display.textContent = `${player.getName()}'s (${player.getSymbol()}) turn`;
        }
    };

    // Method to play a player's turn and record/display their selection
    const playTurn = (event) => {
        let playerChoice = event.currentTarget.id;
        let playerSymbol = player.getSymbol();
        if (gameBoard.board[playerChoice] === '' && !gameOver) {
            gameBoard.move(playerChoice, playerSymbol);
            playGame();
        }
    };

    // Method to clear the board and restart a new game
    const restartGame = () => {
        gameOver = false;
        result = '';
        let name1 = prompt("Who will play X?")
        player1 = Player(name1, 'X');
        let name2 = prompt("Who will play O?")
        player2 = Player(name2, 'O');
        display.textContent = `X: ${player1.getName()} O: ${player2.getName()}`;
        player = player1;
        gameBoard.clear();
        displayBoard();
    };

    // Add event listener to restart game button
    button.addEventListener('click', restartGame);

    // Add event listeners to each board position to play a turn
    squares.forEach((square) => {
        square.addEventListener('click', playTurn);
    });

    return {displayBoard, playGame, restartGame};
})();

// Start a new game upon page load
displayController.restartGame();
