'use strict';

// seleting elements  
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// declare variable
let currentScore, activePlayer, playing, scores

// reset function 
const init = () => {
  scores = [0,0]
  currentScore = 0;
  activePlayer = 0
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
// coll method to reset everything and define variable value
init()

// switch player function
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// event listener for roll dice
btnRoll.addEventListener("click", () =>{
  if (playing) {
    // 1.get random number
    const dice = Math.trunc(Math.random() * 6) +1
    // 2. display the relate img dice number
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`
    // 3. if is 1 pass the turn to the other player
    if (dice !== 1) {
      // add dice to current score
      currentScore  += dice      
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }  else {
      // switch player
      switchPlayer()
    }
  }
});


btnHold.addEventListener("click", () =>{
  if (playing) {
    // 1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
    // 2. check if players score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden')
      // if true end game and say who won
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    } else {
      //  false switch player
      switchPlayer()
    }    
  }
});

btnNew.addEventListener("click", init);

