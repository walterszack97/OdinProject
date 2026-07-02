function Player(name, mark) {
    return {
    
        name: name,
        mark: mark,
        won: false,
        cash: 0,

        greet: function () {
            console.log(`My name is ${this.name}, my mark is ${this.mark}`);
        },

        wins: function() {
            console.log(`${this.name} is the best!`);
        },

        addCash: function() {
            this.cash++;
            console.log("adding cash");
        }
    }

}

const GameBoard = ( function () {
    
    let Board = [
        ['*', '*', '*'],
        ['*', '*', '*'],
        ['*', '*', '*']
    ];

    function showBoard(){
        console.log(`${Board[0]}\n${Board[1]}\n${Board[2]}`)
    };

    function markBoard(positionX, positionY, mark){
        
        if (Board[positionX][positionY] !=='*'){
            console.log('This position is already filled, try again');
            return false;
        }
        
        Board[positionX][positionY] = mark;
        showBoard();
        return true;
        
    };

    function isBoardComplete() {
        for (let i = 0; i <= 2; i++){
            for (let j = 0; j <= 2; j++){
                if (Board[i][j] === '*'){
                    return false;
                }
            }
        }
        return true;
    };

    function checkWin(mark) {
        let count = 0;
        for (let i = 0; i <= 2; i++){
            for (let j = 0; j <= 2; j++){
                if (Board[i][j] === mark){
                    count++;
                }
            }
            if (count === 3) return true;
            count = 0;
        }
        for (let i = 0; i <= 2; i++){
            for (let j = 0; j <= 2; j++){
                if (Board[j][i] === mark){
                    count++;
                }
            }
            if (count === 3) return true;
            count = 0;
        }

        if (Board[1][1] === mark){
            if (Board[0][0] === mark && Board[2][2] === mark){
                return true;
            }
            if (Board[0][2] === mark && Board[2][0] === mark){
                return true;
            }
        }


        return false;
    };

    function restoreBoard() {
        Board = [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*']
        ];
    };

    function getBoard() {
         return Board.flat();
    }

    return {
        checkWin,
        isBoardComplete,
        markBoard,
        restoreBoard,
        getBoard
    }

})();

const DomController = (function () {

    function selectBoardCell () {
        const boardCellElements = document.querySelectorAll(".board_container>div");
        const startGameButton = document.querySelector(".startgame_container")

        startGameButton.addEventListener(`click`, (event) => {
            GameMaster.startRound();
            startGameButton.classList.add("hidden");
        });
         
        boardCellElements.forEach((item, index) => {
            boardCellElements[index].addEventListener(`click`, (event) => {
                
                GameMaster.playTurn(index);
                //console.log(`You clicked cell index # ${index}`)
            })
        })
        
    }

    function showStartButton() {
        const startGameButton = document.querySelector(".startgame_container");

        startGameButton.classList.remove("hidden");
    }

    function renderBoard () {

        const boardCellElements = document.querySelectorAll(".board_container>div");
        let currentBoard = GameBoard.getBoard();
        
        boardCellElements.forEach((item, index) => {
            item.textContent = currentBoard[index];
        })

    }

    function renderPlayer(players) {
        const playerNameElements = document.querySelectorAll(".player-name");
        const playerCashElements = document.querySelectorAll(".player-cash");

        playerNameElements.forEach((item, index) => {
            playerNameElements[index].textContent = players[index].name;
            playerCashElements[index].textContent = `$${players[index].cash}`;
        })
    }

    function renderOutcome() {

    }

    return {
        renderBoard,
        renderPlayer,
        selectBoardCell,
        showStartButton
    }
})();

const GameMaster = (function () {
   
    let gameOver = true;
    let currentPlayer = null;
    let player1 = null;
    let player2 = null;

    function initializeGame() {
        player1 = Player("Zack", "X");
        player2 = Player("Miranda", "O");

        currentPlayer = player1;
        GameBoard.restoreBoard();

        gameOver = true;
    }

    function setGameDefaults() {
        gameOver = false;

        currentPlayer = player1;

        GameBoard.restoreBoard();
    }

    function begin() {
        console.log("Begin called");

        DomController.renderBoard();
        DomController.renderPlayer([player1, player2]);
        DomController.selectBoardCell();
    }

    function startRound() {
        gameOver = false;
        currentPlayer = player1;

        GameBoard.restoreBoard();

        DomController.renderBoard();
        DomController.renderPlayer([player1, player2]);
    }

    function simulateGamePlay(){
        let validMark = false;

        while (!validMark){
            let num1 = getRandomInt(0,2);
            let num2 = getRandomInt(0,2);
            console.log(`${currentPlayer.name}  wants to mark [${num1}][${num2}]`);
            validMark = GameBoard.markBoard(num1, num2, currentPlayer.mark);
            DomController.renderBoard();
            if (validMark) return;
        }
    }

    function playTurn(index){
        if (gameOver) return;

        const row = Math.floor(index / 3);
        const column = index % 3;

        const validMark = GameBoard.markBoard(row, column, currentPlayer.mark);

        if (!validMark) return;

        DomController.renderBoard();

        if (GameBoard.checkWin(currentPlayer.mark)) {
            currentPlayer.wins();
            currentPlayer.addCash();
            gameOver = true;

            DomController.renderPlayer([player1, player2]);
            DomController.showStartButton();
            return;
        }

        if (GameBoard.isBoardComplete()) {
            console.log("TIE GAME");
            gameOver = true;
            DomController.showStartButton();
            return;
        }

        nextTurn();
    }

    function getRandomInt(min, max) {
        // Use Math.floor to round down to the nearest whole number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function nextTurn() {
        if (currentPlayer === player1){
            currentPlayer = player2;
        }
        else currentPlayer = player1;
    }  

    return {
        setGameDefaults,
        begin,
        initializeGame,
        playTurn,
        startRound
    };
   
})();

GameMaster.initializeGame();
GameMaster.begin();