const r = document.title = 'Rock';
const p = document.title = 'Paper';
const s = document.title = 'Scissor';
setInterval(() => {
 let titles = document.title === r ? p : document.title === p ? s : r;
 document.title = titles;
}, 1000);


let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

const autoPlaybuttonElm = document.querySelector('.auto-play-button');
function autoPlay() {
  if (!isAutoPlaying) {
    autoPlaybuttonElm.innerHTML = 'Auto Playing';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    autoPlaybuttonElm.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || 'R') {
    playGame('rock');
  } else if (event.key === 'p' || 'P') {
    playGame('paper');
  } else if (event.key === 's' || 'S') {
    playGame('scissors');
  } else if (event.key === 'a' || 'A') {
    autoPlay();
  } else if(event.key === 'Backspace') {
    confirmReset();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

const resetBtnElm = document.querySelector('.js-reset-score-button');
resetBtnElm.addEventListener('click', () => {
  // confirm('Are you sure you want to reset your score?');
  confirmReset();
})


const confirmResetElm = document.querySelector('.js-reset-confirmation');
function confirmReset() {
  confirmResetElm.innerHTML = `Are you sure you want to reset your score? <button class="js-reset-score-yes">yes</button> <button class="js-reset-score-no">No</button>`;
  resetScore();
}

function resetScore() {
  const confirmationYesElm = document.querySelector('.js-reset-score-yes');
  const confirmationNoElm = document.querySelector('.js-reset-score-no');
  confirmationYesElm.addEventListener('click', function() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreElement();
    confirmResetElm.innerHTML = '';
  });
  confirmationNoElm.addEventListener('click', () => {
    confirmResetElm.innerHTML = '';
  });
}
