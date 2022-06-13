/****
 * Pig Game
 */

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        var dice_1 = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById("dice-1").style.display = 'block';
        document.getElementById("dice-2").style.display = 'block';
        document.getElementById("dice-1").src = 'dice-' + dice_1 + '.png';
        document.getElementById("dice-2").src = 'dice-' + dice_2 + '.png';

        // 3. Update the round score if result !=== false
        if (dice_1 === 6 && dice_2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score--" + activePlayer).textContent = scores[activePlayer];
        } else if (dice_1 !== 1 && dice_2 !== 1) {
            roundScore += dice_1 + dice_2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;   
        } else {
            nextPlayer();
        }
    } 
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add Current score to GLobal score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector("#score--" + activePlayer).textContent = scores[activePlayer];

        // Identify the final score yourself
        var input = document.querySelector('.final-score').value;
        var winningScore;
    
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check who WON
        if (scores[activePlayer] >= winningScore ) {
            document.querySelector("#name--"+ activePlayer).textContent = "Winner!";
            hideDice();
            document.querySelector(".player--" + activePlayer).classList.add('player--winner');
            document.querySelector(".player--" + activePlayer).classList.remove('player--active');
            gamePlaying = false;
            
        } else {
            // Next Player
            nextPlayer();
        }
    }   
});

document.querySelector('.btn--new').addEventListener('click', init)

function init () {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true

    hideDice();
    document.getElementById('score--0').textContent = '0'
    document.getElementById('score--1').textContent = '0'
    document.getElementById('current--0').textContent = '0'
    document.getElementById('current--1').textContent = '0'
    document.getElementById('name--0').textContent = 'Player 1'
    document.getElementById('name--1').textContent = 'Player 2'
    document.querySelector(".player--0").classList.remove('player--winner');
    document.querySelector(".player--1").classList.remove('player--winner');
    document.querySelector(".player--0").classList.remove('player--active');
    document.querySelector(".player--1").classList.remove('player--active');

    document.querySelector(".player--0").classList.add('player--active');

}

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector(".player--0").classList.toggle('player--active');
    document.querySelector(".player--1").classList.toggle('player--active');
    
    hideDice()
}

function hideDice () {
    document.getElementById("dice-1").style.display = 'None';
    document.getElementById("dice-2").style.display = 'None';
}