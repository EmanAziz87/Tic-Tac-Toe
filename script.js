const gameBoard = (() => {
    const stack = [];
    return { stack };
})();

const player = (name, symbol) => {
    const makeMove = (symb) => {
        gameBoard.stack.push(symb);
    };
    return { name, symbol, makeMove };
};

const newPlayer = player('eman', 'X');
newPlayer.makeMove(newPlayer.symbol);

const allQuadrant = document.querySelectorAll('.quadrant');
allQuadrant.forEach((quadrant) => {
    quadrant.addEventListener('click', () => {
        console.log('hello from a quadrant');
    });
});
