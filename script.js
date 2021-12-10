const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const move = (position, symbol) => {
        board[position] = symbol;
    }

    const clear = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    }

    const checkGameStatus = () => {
        let gameOver = false;
        if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
            gameOver = true;
        }
        else if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
            gameOver=true;
        }
        else if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
            gameOver=true;
        }
        else if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
            gameOver=true;
        }
        else if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
            gameOver=true;
        }
        else if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
            gameOver=true;
        }
        else if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
            gameOver=true;
        }
        else if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
            gameOver=true;
        }
        else {
            gameOver = false;
        }
        return gameOver;
    };

    return {board, move, clear, checkGameStatus};
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

const displayController = (() => {
    const player1 = Player('Me', 'X');
    const player2 = Player('You', 'O');

    let gameOver = false;
    let player = player1;

    const board = document.querySelector('#board');
    const squares = board.querySelectorAll('div');
    let square = Array.from(squares);

    const displayBoard = () => {
        for (let i = 0; i < square.length; i++) {
            square[i].textContent = gameBoard.board[i];
        }
    };

    const playGame = () => {
        displayBoard();
        gameOver = gameBoard.checkGameStatus();
        if (gameOver) {

        }
        if (player === player1) {
            player = player2;
        }
        else {
            player = player1;
        }
        gameOver = true;
    }

    const playTurn = (event) => {
        let playerChoice = event.currentTarget.id;
        let playerSymbol = player.getSymbol();
        gameBoard.move(playerChoice, playerSymbol);
        console.log(playerChoice);
        playGame();
    };

    squares.forEach((square) => {
        square.addEventListener('click', playTurn);
    });

    return {displayBoard, playGame};
})();

displayController.displayBoard();