const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const move = (position, symbol) => {
        board[position] = symbol;
    }

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

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

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

    const displayBoard = () => {
        for (let i = 0; i < square.length; i++) {
            square[i].textContent = gameBoard.board[i];
        }
    };

    const changePlayer = (player) => {
        if (player === player1) {
            player = player2;
        }
        else {
            player = player1;
        }
        return player;
    };

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

    const playTurn = (event) => {
        let playerChoice = event.currentTarget.id;
        let playerSymbol = player.getSymbol();
        if (gameBoard.board[playerChoice] === '' && !gameOver) {
            gameBoard.move(playerChoice, playerSymbol);
            playGame();
        }
    };

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

    button.addEventListener('click', restartGame);

    squares.forEach((square) => {
        square.addEventListener('click', playTurn);
    });

    return {displayBoard, playGame, restartGame};
})();

displayController.restartGame();