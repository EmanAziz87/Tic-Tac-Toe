'use strict';

// takes chosen quadrant as parameter and pushes it to a player array
let playerOneChoices = [];
let playerTwoChoices = [];
let gameOver = false;

const players = (name) => {
    return { name };
};

const playerOne = players('Eman');
const playerTwo = players('joe');

// eventlistener for quadrant click retrieves number of quadrant through
// class name and passes it to the gameBoard function to be added to the
// array.

const makeMove = (() => {
    const allQuadrant = document.querySelectorAll('.quadrant');
    let chosenQuadrant = 0;

    const pushValues = (quadrantNumChoice, playerChoices, playerName) => {
        playerChoices.push(quadrantNumChoice);
        console.log(winCondition(playerChoices, playerName));
    };

    const storeQuadrantValues = () => {
        allQuadrant.forEach((quadrant) => {
            quadrant.addEventListener('click', (event) => {
                const tempArr = event.target.classList[0].split('-');
                chosenQuadrant = parseInt(tempArr[0]);

                if (quadrant.textContent == 'X' && !gameOver) {
                    pushValues(chosenQuadrant, playerOneChoices, playerOne.name);
                } else if (quadrant.textContent == 'O' && !gameOver) {
                    pushValues(chosenQuadrant, playerTwoChoices, playerTwo.name);
                }
            });
        });
    };

    return { storeQuadrantValues };
})();

// Alternatingly adds textContent X or O on a quadrant when clicked
// depending on playerChoice boolean value.
const displayController = () => {
    let playerChoice = true;
    const allQuadrant = document.querySelectorAll('.quadrant');

    allQuadrant.forEach((quadrant) => {
        quadrant.addEventListener('click', () => {
            if (quadrant.textContent == '') {
                if (playerChoice && !gameOver) {
                    quadrant.textContent = 'X';
                    playerChoice = false;
                } else if (!playerChoice && !gameOver) {
                    quadrant.textContent = 'O';
                    playerChoice = true;
                }
            }
        });
    });
};

function winCondition(playerChoicesArray, playerName) {
    const wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [7, 5, 3],
    ];

    // checks if win condition arrays match values with the player choice
    // array that was passed as a parameter.
    if (!gameOver) {
        for (const winCondition of wins) {
            let crossAchieved = 0;
            for (const choice of playerChoicesArray) {
                for (let i = 0; i < 3; i++) {
                    if (winCondition[i] == choice) {
                        // if values a number matched, increase the
                        // cross achieved variable by 1, If it reaches 3,
                        // someone won!
                        crossAchieved++;
                    }

                    if (crossAchieved == 3) {
                        gameOver = true;
                        return `${playerName} won!`;
                    }
                }
            }
        }
        // returns crossAchieved
        return 'Keep going...';
    }
}

displayController();
makeMove.storeQuadrantValues();
