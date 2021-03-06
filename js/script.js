var newGameBtn = document.getElementById('js-newGameButton'),
    closeGameBtn = document.getElementById('js-closeGameButton');

newGameBtn.addEventListener('click', newGame);
closeGameBtn.addEventListener('click', closeGame);

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
    
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    closeGameElem = document.getElementById('js-closeGameElement');
    
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        closeGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameElem.style.display = 'inline-block';
        newGameBtn.innerText = 'Play again';
        closeGameElem.style.display = 'inline-block';
        closeGameBtn.innerText = 'Game over';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        break;
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        newGameBtn.innerText = 'New game';
        closeGameElem.style.display = 'none';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
    
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

function closeGame() {
    gameState = 'notStarted';
    setGameElements();
}

function playerPick(playerPick) {
    console.log(playerPick);
}

var x = Math.random();
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
    
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
     setGamePoints();
     gameOver();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function gameOver() {
    if (player.score == 5) {
        alert ('Congrats! ' + playerNameElem.innerHTML + ', you are the WINNER!');
        gameState = 'ended';
        setGameElements();
    } 
    else if (computer.score == 5) {
        alert ('Upsss...the WINNER is computer!');
        gameState = 'ended';
        setGameElements();
    }
}