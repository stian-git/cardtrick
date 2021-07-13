# Cardtrick
## by [Stian Martinsen](https://www.linkedin.com/in/stian-martinsen-1662a515/), 2021

---
**Intro:**
 My first own JavaScript-project. Created before I have had any classes of JavaScript, so there is probably some rookie-mistakes.
 The idea came up when one of my teachers (https://codepen.io/mjphillip) introduced me to the deckofcards API, when he showed how to make a BlackJack-game: 

**Goals:**
- Use JavaScript to create a card trick.
- Get some experience on async functions.
- Use the API from http://deckofcardsapi.com/.

**Why this trick?**
- I selected this trick because it is easy, and there is no cheating. In theory you could use your own deck and follow along during the trick.
- By adding animations on dealing and undealing of the cards, I probably could have improved the user experience even more, but the trick is still the same.

---
**Some comments and questions after creating the project:**

*How much info should be put in the HTML?*

During the API-call I get a result of "an array inside an array inside a third array" and I create a variable from the inner array in a new array. I was able to easily extract the middle from the our array, but the same method on the inner array did not work the same way. I expect there to be a simpler way to store the correct value directly in the cards-variable, but I used a workaround that iterates a push of each value and didn`t bother to look more into it.

---
`{
"success": true, 
"deck_id": "bvswbt1xf380", 
"cards": [
	{"code": "0D", "image": "https://deckofcardsapi.com/static/img/0D.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0D.svg", "png": "https://deckofcardsapi.com/static/img/0D.png"}, "value": "10", "suit": "DIAMONDS"}, 	{"code": "KS", "image": "https://deckofcardsapi.com/static/img/KS.png", "images": {"svg": "https://deckofcardsapi.com/static/img/KS.svg", "png": "https://deckofcardsapi.com/static/img/KS.png"}, "value": "KING", "suit": "SPADES"}, 	{"code": "0S", "image": "https://deckofcardsapi.com/static/img/0S.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0S.svg", "png": "https://deckofcardsapi.com/static/img/0S.png"}, "value": "10", "suit": "SPADES"},
"remaining": 31
}`


*Each pile got its own array of cards. Maybe there is a simpler way than I have used to define these?*
`pile1 = [
    CardDeck[0],
    CardDeck[3],
    CardDeck[6],
    CardDeck[9],
    CardDeck[12],
    CardDeck[15],
    CardDeck[18],
];`

