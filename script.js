
var gameDisplay = document.getElementById('game-display');
var gameState = ['','','','','','','','',''];
var gameActive = true;
var currentPlayer = 'X';
var allCells = document.getElementsByClassName('cell');
var gameRules = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]; // 8 pravila


for (const cell of allCells) {
    cell.addEventListener('click',cellClicked);
}

gameDisplay.innerHTML = playerTurn();


function cellClicked(event){
   // ovdje se desava click na celiju
    var cellSelected = event.target;
    var cellIndex = parseInt ( // parseInt jer hocemo odmah broj iz gameState a po defaultu je string
        cellSelected.getAttribute('data-cell-index')
    );

    if ( gameState[cellIndex] !=='' || !gameActive) {  // zaustavi program ako celija nije prazna ili igra nije vise aktivna ako je neko win ili draw
            return;  // return prekida program

    }

    handleCellSelected(cellSelected, cellIndex);
    handleGameRules();


    console.log(gameState);
}

function handleCellSelected (cellSelected,cellIndex) {
    // ovdje se pise logika za popunjavanje gameState
    cellSelected.innerHTML = currentPlayer;
    gameState[cellIndex] = currentPlayer;

}

function handleGameRules(){
    var won = false;
    for (var i = 0; i <= 7; i++) {
        // [0,1,2], ['X','X','X']
        var rule = gameRules[i];
        var a = gameState[rule[0]] // X
        var b = gameState[rule[1]] // ''
        var c = gameState[rule[2]] // X
        
        if( a === '' || b === '' || c === ''){
            continue;
        }

        if( a === b && b === c){
            won = true;
            break;
        }
    }

    if(won){
        gameDisplay.innerHTML = winMessage();
        gameActive = false;
        return;
    }

    var draw = !gameState.includes('');
    if(draw){
        gameDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer(){
    currentPlayer = currentPlayer === 'X'?'O':'X'; // mijenjane igraca
    gameDisplay.innerHTML = playerTurn(); // poruka ko je na potezu
}

function winMessage (){
    return `Won playaa ${ currentPlayer }`;
}
function drawMessage (){
    return 'Draw, try again nigga';
}
function playerTurn (){
    return `On turn playaa ${ currentPlayer }`;
}

function restartGame(){
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['','','','','','','','',''];
    gameDisplay.innerHTML = playerTurn();
    for (const cell of allCells) {
        cell.innerHTML = '';
    }
    
}