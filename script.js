'use strict';

const headerInfoText = document.querySelector('.game-info-text');
let playerOneChoices = [];
let playerTwoChoices = [];
let gameOver = false;

const players = (name) => {
    return { name };
};

const playerOneChooseName = prompt('Player One, please choose your name');
const playerTwoChooseName = prompt('Player Two, please choose your name');

const playerOne = players(playerOneChooseName);
const playerTwo = players(playerTwoChooseName);
headerInfoText.textContent = `${playerOne.name}'s Turn`;

const displayController = () => {
    let playerChoice = true;
    const allQuadrant = document.querySelectorAll('.quadrant');

    allQuadrant.forEach((quadrant) => {
        quadrant.addEventListener('click', () => {
            if (quadrant.textContent == '') {
                if (playerChoice && !gameOver) {
                    quadrant.textContent = 'X';
                    playerChoice = false;
                    headerInfoText.textContent = `${playerTwo.name}'s Turn`;
                } else if (!playerChoice && !gameOver) {
                    quadrant.textContent = 'O';
                    playerChoice = true;
                    headerInfoText.textContent = `${playerOne.name}'s Turn`;
                }
            }
        });
    });
};

const makeMove = (() => {
    const allQuadrant = document.querySelectorAll('.quadrant');
    let chosenQuadrant = 0;

    const pushValues = (quadrantNumChoice, playerChoices, playerName) => {
        if (!playerChoices.includes(quadrantNumChoice)) {
            playerChoices.push(quadrantNumChoice);
            winCondition(playerChoices, playerName);
        }
    };

    const storeQuadrantNumValue = () => {
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

    return { storeQuadrantNumValue };
})();

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

    if (!gameOver) {
        for (const winCondition of wins) {
            let crossAchieved = 0;

            for (const choice of playerChoicesArray) {
                for (let i = 0; i < 3; i++) {
                    if (winCondition[i] == choice) {
                        crossAchieved++;
                    }

                    if (crossAchieved == 3) {
                        gameOver = true;
                        headerInfoText.textContent = `${playerName} won!`;
                    }
                }
            }
        }
    }
}

displayController();
makeMove.storeQuadrantNumValue();
