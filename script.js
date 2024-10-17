const gameboard = [];

let gameOver = false;

const gameInfo = document.querySelector(".info");

function BoardSpace(index, value, element) {

    this.index = index;
    this.value = value;
    this.element = element;

    this.changeSpaceValue = function(newValue) {
        this.value = newValue;
        this.element.textContent = newValue; 
    };
  }

  function Player(name, value){
    this.name = name;
    this.value = value;
  }



function FillBoard(){
    
    const htmlBoard = document.querySelector(".main")

    for(let i = 0; i < 9; i++){
        const newSpace = document.createElement('div');
        newSpace.classList.add("space");
        
        const boardSpace = new BoardSpace(i, "E", newSpace);
        gameboard[i] = boardSpace; 
        
        newSpace.addEventListener("click", () => {
            
            if(gameOver) return;
            
            if(newSpace.textContent != "") {
                alert("Space is already taken");
            } 
            else 
            {
                boardSpace.changeSpaceValue(currentPlayer.value); 
                if(!CheckWinCondition())
                {
                    if(CheckDrawCondition())
                        {
                            gameInfo.textContent = "IT'S A TIE!!!";
                            gameOver = true;
                            return;
                        }
                    SwapPlayer();
                }
                else
                {
                    gameInfo.textContent = currentPlayer.name +" wins the game!";
                    gameOver = true;
                }
                
            }
        });

        htmlBoard.appendChild(newSpace); 
    }
    
}

const player1 = new Player("Tete", "X");
const player2 = new Player("Toto", "O");
let currentPlayer = player1;

FillBoard();

function SwapPlayer(){
    if(currentPlayer == player1){
        currentPlayer = player2;
    }
    else{
        currentPlayer = player1;
    }

    gameInfo.textContent = "It's "+currentPlayer.name+"'s turn!"
}

function CheckWinCondition() {
    // Define the winning combinations
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    // Check all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        // Check if the current player occupies all three spaces in a combination
        if (
            gameboard[a].value === currentPlayer.value &&
            gameboard[b].value === currentPlayer.value &&
            gameboard[c].value === currentPlayer.value
        ) {
            return true; // The current player has won
        }
    }

    return false; // No winning combination found
}

function CheckDrawCondition() {

    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i].value === "E") {
            return false; 
        }
    }
    return true;
}

