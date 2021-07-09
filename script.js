const bodyHTML = document.documentElement.querySelector("body");

//let allCardsHTML;
let buttonIsStart = true;
let pile1 = [];
let pile2 = [];
let pile3 = [];
let pileSelectionCounter = 0;
let pileSelectionButtons;

const mainHTML = document.documentElement.querySelector("main");
const correctCardHTML =
  document.documentElement.querySelector(".correctCardArea");
const mainheaderHTML = document.documentElement.querySelector(".mainheader");
const allCardsHTML = document.documentElement.querySelector(".allcards");
const startButton = document.documentElement.querySelector(".startButton");
const changeCardsButton =
  document.documentElement.querySelector(".changeCardsButton");
//const continueButtonArea = document.documentElement.querySelector(".continue");
const continueButton =
  document.documentElement.querySelector(".continueButton");
const pile1placement = document.documentElement.querySelector(".pile1cards");
const pile2placement = document.documentElement.querySelector(".pile2cards");
const pile3placement = document.documentElement.querySelector(".pile3cards");

pileSelectionButtons =
  document.documentElement.querySelectorAll(".pileselection");
let cards;

const getNewCards = async function () {
  // Empties the array which may hold previous items.
  cards = [];
  // Get the deck_id
  let response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  // convert response to json format.
  let post = await response.json();
  // Get the cards in the deck
  let cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${post.deck_id}/draw/?count=21`
  );
  // convert response to json format.
  let tempCards = await cardResponse.json();
  //resetting cards to only store the cards info.
  tempCards = tempCards.cards;

  // iterating through tempCards to create a new Array to store only the images.
  tempCards.forEach((card) => {
    cards.push(card.image);
  });
  //console.log("Fetched array:");
  //console.log(cards);
};

// bug 8.july // first array incl. all json keys, re-piling incl. only images.

getNewCards();

startButton.onclick = async function () {
  // makes the change cards button visible.

  if (buttonIsStart === true) {
    buttonIsStart = false;
    startButton.innerHTML = "Reset Game";
    changeCardsButton.style.setProperty(`display`, "inline-flex");
    presentDeck();
  } else {
    startButton.innerHTML = "Start Game";
    changeCardsButton.style.setProperty(`display`, `none`);
    mainheaderHTML.style.setProperty(`display`, `none`);
    continueButton.style.setProperty(`display`, `none`);
    buttonIsStart = true;
    pileSelectionCounter = 0;
    allCardsHTML.innerHTML = ``;
    ClearPiles();
    showPileButtons(0);
    correctCardHTML.innerHTML = ``;
    await getNewCards();
  }
};

changeCardsButton.onclick = async function () {
  //getDeckId();
  await getNewCards();
  presentDeck();
};

function presentDeck() {
  //changeCardsButton.style.setProperty(`display`, "inline-flex");
  mainheaderHTML.style.setProperty(`display`, `flex`);
  mainheaderHTML.innerHTML = `Remember one of these cards before you click "Continue".`;
  allCardsHTML.innerHTML = ``;
  //const allCardsHTML = document.documentElement.querySelector(".allcards");
  for (i = 0; i < cards.length; i++) {
    //console.log(cards.cards[i].image);
    allCardsHTML.innerHTML += `<img src="${cards[i]}" class="card">`;
  }
  // Adding Continue-button with onClick.
  //maincontinueHTML.innerHTML += `<button class="continueButton">Continue</button>`;
  continueButton.style.setProperty(`display`, `flex`);
}

continueButton.onclick = function () {
  //console.log("Click!");
  changeCardsButton.style.setProperty(`display`, `none`);
  continueButton.style.setProperty(`display`, `none`);
  allCardsHTML.innerHTML = ``;
  //mainHTML.innerHTML = ``;
  //console.log("continuebutton cards:");
  //console.log(cards);
  presentPiles(cards);
};

function presentPiles(CardDeck) {
  mainheaderHTML.innerHTML = `2. Click the pile-button below the pile where you see your card, round: ${
    pileSelectionCounter + 1
  }`;
  let cardRow1 = 0,
    cardRow2 = 0,
    cardRow3 = 0;
  // ordering the piles
  pile1 = [
    CardDeck[0],
    CardDeck[3],
    CardDeck[6],
    CardDeck[9],
    CardDeck[12],
    CardDeck[15],
    CardDeck[18],
  ];
  pile2 = [
    CardDeck[1],
    CardDeck[4],
    CardDeck[7],
    CardDeck[10],
    CardDeck[13],
    CardDeck[16],
    CardDeck[19],
  ];
  pile3 = [
    CardDeck[2],
    CardDeck[5],
    CardDeck[8],
    CardDeck[11],
    CardDeck[14],
    CardDeck[17],
    CardDeck[20],
  ];
  //console.log(pile1);
  //console.log(pile2);
  //console.log(pile3);
  pile1.forEach((card) => {
    cardRow1++;
    //console.log(cardRow1 + " - " + card);
    pile1placement.innerHTML += `<img src="${card}" class="cardpiles cardrow1${cardRow1}">`;
    if (cardRow1 === 2 || cardRow1 === 5) {
      pile1placement.innerHTML += `<br class="newCardLine">`;
    }
    // if (cardRow1 === 7) {
    //   pile1placement.innerHTML += `</div>`;
  });
  //pile1placement.innerHTML += `</div>`;
  pile2.forEach((card) => {
    cardRow2++;
    pile2placement.innerHTML += `<img src="${card}" class="cardpiles cardrow2${cardRow2}">`;
    if (cardRow2 === 2 || cardRow2 === 5) {
      pile2placement.innerHTML += `<br class="newCardLine">`;
    }
  });
  pile3.forEach((card) => {
    cardRow3++;
    pile3placement.innerHTML += `<img src="${card}" class="cardpiles cardrow3${cardRow3}">`;
    if (cardRow3 === 2 || cardRow3 === 5) {
      pile3placement.innerHTML += `<br class="newCardLine">`;
    }
  });
  //
  //mainheaderHTML.style.setProperty(`display`, `none`);
  showPileButtons(1);
  // pileSelectionButtons.forEach(function (button) {
  //   button.style.setProperty(`display`, `flex`);
  // });
}

pileSelectionButtons.forEach(function (button) {
  button.addEventListener("click", () => {
    pileSelectionCounter++;
    //console.log("PileSelectionCounter: " + pileSelectionCounter);
    //console.log("Button " + button.parentElement.className + " clicked, counter, " + pileSelectionCounter);
    if (pileSelectionCounter < 3) {
      //console.log(button.parentElement.className);
      let buttonClass = button.parentElement.className;
      if (buttonClass === "pile1") {
        //console.log("Button = pile1");
        //newCardOrder(rePileOrder(1));
        ClearPiles();
        //dealCardsInPiles(newCardOrder(rePileOrder(1)));
        //dealCardsInPiles(getNextCardArray(1));
        //console.log(cards);
        let nextArray = getNextCardArray(1);
        //console.log(nextArray);
        //presentPiles(getNextCardArray(1));
        presentPiles(nextArray);
        //getNextCardArray(1);
      } else if (buttonClass === "pile2") {
        //console.log("Button = pile2");
        //newCardOrder(rePileOrder(2));
        ClearPiles();
        //dealCardsInPiles(newCardOrder(rePileOrder(2)));
        //dealCardsInPiles(getNextCardArray(2));
        presentPiles(getNextCardArray(2));
      } else if (buttonClass === "pile3") {
        //console.log("Button = pile3");
        //newCardOrder(rePileOrder(3));
        ClearPiles();
        //dealCardsInPiles(newCardOrder(rePileOrder(3)));
        //dealCardsInPiles(getNextCardArray(3));
        presentPiles(getNextCardArray(3));
      }
    } else {
      // console.log(
      //   "Ready to reveal card after pile selection #" + pileSelectionCounter
      // );
      //console.log(button.parentElement.className.replace("pile", ""));
      let CorrectPile = getNextCardArray(
        button.parentElement.className.replace("pile", "")
      );
      //console.log(button.parentElement.className);
      //console.log("Your card is in pile: " + CorrectPile);
      //console.log("Card: " + CorrectPile[10]);
      presentCorrectCard(CorrectPile[10]);
    }
  });
});

function ClearPiles() {
  //console.log("Clearing piles");
  pile1placement.innerHTML = ``;
  pile2placement.innerHTML = ``;
  pile3placement.innerHTML = ``;
}

function showPileButtons(boolean) {
  if (boolean === 1) {
    pileSelectionButtons.forEach(function (button) {
      button.style.setProperty(`display`, `inline-block`);
    });
  } else {
    pileSelectionButtons.forEach(function (button) {
      button.style.setProperty(`display`, `none`);
    });
  }
}

function getNextCardArray(selectedPile) {
  //console.log("GetNextCards: " + selectedPile);
  let piles = [1, 2, 3];
  // removes the pile to be selected.
  piles.splice(selectedPile - 1, 1);
  // randomize (select which of the remaining piles to start with.)
  if (Math.round(Math.random()) === 1) {
    piles.reverse();
  }
  // adds the selectedPile to the middle of the array.
  piles.splice(1, 0, selectedPile);
  // splitting piles:
  //console.log("Original piles (before repiling)");
  //console.log(pile1);
  //console.log(pile2);
  //console.log(pile3);
  firstPile = "pile" + piles[0];
  selectedPile = "pile" + piles[1];
  LastPile = "pile" + piles[2];
  let nextDeck = eval(firstPile).concat(eval(selectedPile), eval(LastPile));
  //console.log(nextDeck);
  return nextDeck;
}

function presentCorrectCard(correctCard) {
  console.log("Correct card is: " + correctCard);
  ClearPiles();
  showPileButtons(0);
  mainheaderHTML.innerHTML = `According to my intelligence this is your card...`;
  mainheaderHTML.style.setProperty(`display`, `flex`);
  correctCardHTML.innerHTML += `<img src="${correctCard}" class="correctCard">`;
}
