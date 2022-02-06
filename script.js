'use strict';

// seleting elements  
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');


// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden')
 
// data
const scores = [0,0]
let currentScore = 0;
let activePlayer = 0
let playing = true;


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
    // add the number to the current scoore

    // 3. if is 1 pass the turn to the other player
    if (dice !== 1) {
      // add dice to current score
      currentScore  += dice
      
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore // change later to different player
    
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
      // if true end game and say who won
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  
      console.log("you won");
    } else {
      //  false switch player
      switchPlayer()
    }    
  }
});

