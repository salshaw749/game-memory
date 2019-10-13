// create a list of the card types, so we can shuffle it 
var cardType = [
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-leaf", "fa-leaf",
    "fa-diamond", "fa-diamond",
    "fa-bomb", "fa-bomb",
    "fa-bicycle", "fa-bicycle"
];

var starz = " fa-star ";
// to genrate the cards 
function generating_cards(card) {
    return `<li class="card" data-card="${card}"> <i class="fa ${card}"></i></li>`;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
let starRating = 0;
// to add the starz based on the player movements 
let updateRating = function() {
    if (move <= 20)
        starRating = 3;
    else if ((move > 20) && (move <= 30))
        starRating = 2;
    else
        starRating = 1;

    let ratingHTML = "";
    for (let i = 0; i < starRating; i++) {
        ratingHTML += `<li><i class="fa ${starz}"></i></li>`;
    }
    let stars = document.querySelector('.stars');
    stars.innerHTML = ratingHTML;
};



// activate the game 
function StartTheGame() {
    let deck = document.querySelector('.deck');

    // genrate the cards using shuffle function 
    let cardSyntaxGenerator = shuffle(cardType).map(function(card) {
        return generating_cards(card);
    });

    deck.innerHTML = cardSyntaxGenerator.join('');

}

StartTheGame();
// to take all the cards that have been intialzed after starting the game 
let AllCards = document.querySelectorAll('.card');
let x;
let counter = 0;
let counterSec = 0;
let counterMin = 0;
let restart = document.querySelector('.restart');
let counterForopenCards = 0;
let move = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let openCards = [];
// if the user clicked the repeate elemeant then the game will be refreshed 
restart.addEventListener('click', (e) => {
    location.reload(true);
});

//
// loop throght each card 
AllCards.forEach(function(card) {

    updateRating();

    // start counting after first click 
    card.addEventListener('click', function(e) {
        // start counting 
        if (x === undefined) {
            x = setInterval(function() {
                counterSec++;
                if (counterSec === 60) {
                    counterSec = 0;
                    counterMin++;
                }
                document.querySelector("#seconds").innerHTML = counterMin + ":" + counterSec;
                updateRating();
            }, 1000);
        }
        // check before execut . 
        if (!e.target.matches('data-card') && openCards.length >= 2) return;


        // check if the cards hasn't opend the do this action 
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            counter++;
            // update the move after clicking 
            move++;
            moveCounter.innerText = "Your moves: " + move;
            openCards.push(card);
            card.classList.add('show', 'open');
            // to check the 2 cards are matched or not 
            if (openCards.length == 2) {
                // if they match we going to add the 'match', 'show', 'open' classes 
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match', 'show', 'open', 'added');
                    openCards[1].classList.add('match', 'show', 'open', 'added');
                    counterForopenCards++;

                    openCards = [];
                } else {
                    // if not matched remove the classes and flip the cards back 
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('show', 'open');

                        });
                        openCards = [];
                    }, 1000);
                }


            }

        }
        // if statment to check if all the cards has been opend 
        if (counterForopenCards === 8) {

            displayWinScreen();
            clearTimeout(x);
        }

    });


});
// CREATEING A FUNCTION TO DISPLAY THE Congratulations Popup
let displayWinScreen = function() {

    let victoryScreen = document.querySelector('body');
    victoryScreen.style.display = "block";
    let victoryTemplate = `
  
    <div class="alert alert-success moveStyleCenter ">
    <p><strong class="mr-auto">Congratulations! You Won! 👍 👍</strong>
      With ${move} moves and ${starRating} stars Woohoo!</p>
      <button class="playAgainButton " onClick="location.reload(true);"> Play again! </button>
  </div>
  
     
    `;

    victoryScreen.innerHTML = victoryTemplate;
};