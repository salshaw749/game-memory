# Memory Game Project
This is a simple game built to test a users memory. There's a deck of cards with different icons. Moreover, the challinging part is to match cards in less time with less moves.
The game starts when you make the first choice move. So the timer begins to record your work till you match all the cards.


## How to play

-Click on a card
-Keep revealing cards and working your memory to remember each unveiled card.
-Match cards properly with less moves and in faster time

# Project Specification

## Game Behavior
- The game randomly shuffles the cards. 
- When a player wins the game, a congratulations popup apears and asks for one more game. It tells the player how much time it took to win the game, and what the star rating was.
- A restart button allows the player to reset the game board at any time of the game: the timer, and the star rating. 
- The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it should display 3 stars. After some number of moves, it should change to a 2 star rating. After a few more moves, it should change to a 1 star rating.
- When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.
- Player wins once all cards have successfully been matched.

## Dependencies

I've used a bootstrap for the Congratulations Popup.

