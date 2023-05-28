// // const cards = document.querySelectorAll(".card");
// const formContainer = document.getElementById("form-container");
// const nameInput = document.getElementById("name");
// const cardCountInput = document.getElementById("card-count");
// const matchedCount = document.getElementById("matchedCount");

// let cards = [];
// let matched = 0;
// let cardOne, cardTwo;
// let disableDeck = false;
// let cardIcons = [
//     "img-1.png", "img-2.png", "img-3.png", "img-4.png", "img-5.png" ,"img-6.png", "img-7.png", "img-8.png",
//     "img-9.png", "img-10.png", "img-11.png", "img-12.png", "img-13.png", "img-14.png", "img-15.png"
// ];

// const cardList = document.getElementById("card-list");

// cardIcons.forEach((icon)=> {
//     const li = document.createElement('li');
//     li.classList.add('card');

//     const frontView = document.createElement('div');
//     frontView.classList.add('view', 'front-view');

//     const iconImg = document.createElement('img');
//     iconImg.src = 'images/que_icon.svg';
//     iconImg.alt = 'icon';

//     frontView.appendChild(iconImg);

//     const backView = document.createElement('div');
//     backView.classList.add('view', 'back-view');

//     const cardImg = document.createElement('img');
//     cardImg.src = 'images/' + icon;
//     cardImg.alt = 'card-img';

//     backView.appendChild(cardImg);

//     li.appendChild(frontView);
//     li.appendChild(backView);

//     cardList.appendChild(li);
// });

// const gameForm = document.getElementById("game-form");
// gameForm.addEventListener("submit", startGame);

// function startGame(event) {
//     event.preventDefault(); //prevent form submission
// }

// const name = nameInput.value;
// const cardCount = parseInt(cardCountInput.value);

// //validating the input
// if (name.trim() === "" || isNaN(cardCount) || cardCount < 1 || cardCount > 30) {
//     alert("Please enter a valid name & choose a number of cards between 1 and 30");
//     return;
// }

// function flipCard({target: clickedCard}) {
//     if(cardOne !== clickedCard && !disableDeck) {
//         clickedCard.classList.add("flip");
//         if(!cardOne) {
//             return cardOne = clickedCard;
//         }
//         cardTwo = clickedCard;
//         disableDeck = true;
//         let cardOneImg = cardOne.querySelector(".back-view img").src,
//         cardTwoImg = cardTwo.querySelector(".back-view img").src;
//         matchCards(cardOneImg, cardTwoImg);
//     }
// }

// function matchCards(img1, img2) {
//     if(img1 === img2) {
//         matched++;
//         matchedCount.textContent = matched;
//         if(matched == 8) {
//             setTimeout(() => {
//                 shuffleCard();
//                 matched = 0;
//                 matchedCount.textContent = matched;
//             }, 1000);
//         }
//         cardOne.removeEventListener("click", flipCard);
//         cardTwo.removeEventListener("click", flipCard);
//         cardOne = cardTwo = "";
//         return disableDeck = false;
//     }
//     setTimeout(() => {
//         cardOne.classList.add("shake");
//         cardTwo.classList.add("shake");
//     }, 400);

//     setTimeout(() => {
//         cardOne.classList.remove("shake", "flip");
//         cardTwo.classList.remove("shake", "flip");
//         cardOne = cardTwo = "";
//         disableDeck = false;
//     }, 1200);
// }

// function shuffleCard() {
//     matched = 0;
//     disableDeck = false;
//     cardOne = cardTwo = "";
//     let arr = [];
//     for (let i = 1; i <= 15; i++) {
//         arr.push(i);
//         arr.push(i);
//     }
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1);

//     cards.forEach((card, i) => {
//         card.classList.remove("flip");
//         let imgTag = card.querySelector(".back-view img");
//         imgTag.src = `images/img-${arr[i]}.png`;
//         card.addEventListener("click", flipCard);
//     });
// }

// shuffleCard();
    
// cards.forEach(card => {
//     card.addEventListener("click", flipCard);
// })

// const restartButton = document.getElementById("restartButton");
// restartButton.addEventListener("click", restartGame);

// function restartGame() {
//     disableDeck = true; // Disable card flipping during restart
//     // Add a delay before resetting the cards
//     setTimeout(() => {
//         cards.forEach((card) => {
//           card.classList.remove("flip");
//           card.addEventListener("click", flipCard);
//         });
    
//         setTimeout(() => {
//           shuffleCard();
//           matched = 0;
//           matchedCount.textContent = matched;
//           disableDeck = false; // Enable card flipping after restart
//         }, 200); // Add a slight delay before shuffling the cards
//       }, 200); // Add a slight delay before resetting the cards
// };


const formContainer = document.getElementById("form-container");
const gameForm = document.getElementById("game-form");
const nameInput = document.getElementById("name");
const cardCountInput = document.getElementById("card-count");
const matchedCount = document.getElementById("matchedCount");
const cardList = document.getElementById("card-list");
const gameContainer = document.getElementById("game-container");
const gameOver = document.getElementById("game-over");
const gameTime = document.getElementById("game-time");
const restartButton = document.getElementById("restartButton");

let cards = [];
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let cardIcons = [
    "img-1.png", "img-2.png", "img-3.png", "img-4.png", "img-5.png" ,"img-6.png", "img-7.png", "img-8.png",
    "img-9.png", "img-10.png", "img-11.png", "img-12.png", "img-13.png", "img-14.png", "img-15.png"
];

gameForm.addEventListener("submit", startGame);

function startGame(event) {
    event.preventDefault();

    const name = nameInput.value;
    const cardCount = parseInt(cardCountInput.value);

    formContainer.style.display = "none";
    gameContainer.style.display = "block";

    generateCards(cardCount);
    shuffleCard();
    updateGameInfo();

    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });

    restartButton.addEventListener("click", restartGame);

    // Start the game timer
    const startTime = new Date();
    setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
        updateGameTime(elapsedTime);
    }, 1000);
}

function generateCards(cardCount) {
    cardList.innerHTML = ""; // Clear existing cards

    const selectedIcons = cardIcons.slice(0, cardCount / 2);
    const allCards = selectedIcons.concat(selectedIcons); // Create pairs of cards

    shuffleArray(allCards);

    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement("li");
        card.classList.add("card");

        const frontView = document.createElement("div");
        frontView.classList.add("view", "front-view");

        const iconImg = document.createElement("img");
        iconImg.src = "images/que_icon.svg";
        iconImg.alt = "icon";
        frontView.appendChild(iconImg);

        const backView = document.createElement("div");
        backView.classList.add("view", "back-view");

        const cardImg = document.createElement("img");
        cardImg.src = "images/" + allCards[i];
        cardImg.alt = "card-img";
        backView.appendChild(cardImg);

        card.appendChild(frontView);
        card.appendChild(backView);

        card.addEventListener("click", flipCard); // Add click event listener to the card

        cardList.appendChild(card);
    }

    cards = document.querySelectorAll(".card");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        matchedCount.textContent = matched;
        if (matched === cards.length / 2) {
            setTimeout(() => {
                endGame();
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function endGame() {
    disableDeck = true; // Disable card flipping
    gameContainer.style.display = "none";
    gameOver.style.display = "block";
    const endTime = new Date();
    const totalTime = Math.floor((endTime - startTime) / 1000); // in seconds
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    gameTime.textContent = `${minutes} minutes and ${seconds} seconds.`;
}

function restartGame() {
    disableDeck = true; // Disable card flipping during restart
    matched = 0;
    matchedCount.textContent = matched;

    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("flip");
            card.addEventListener("click", flipCard);
        });

        setTimeout(() => {
            shuffleCard();
            disableDeck = false; // Enable card flipping after restart
        }, 200); // Add a slight delay before shuffling the cards
    }, 200); // Add a slight delay before resetting the cards
}

function updateGameInfo() {
    matchedCount.textContent = matched;
}

function updateGameTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    gameTime.textContent = `${minutes} minutes and ${seconds} seconds.`;
}

function endGame() {
    disableDeck = true; // Disable card flipping
    clearInterval(timerInterval);
    gameContainer.style.display = "none";
    gameOver.style.display = "block";
    const endTime = new Date();
    const totalTime = Math.floor((endTime - startTime) / 1000); // in seconds
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    gameTime.textContent = `${minutes} minutes and ${seconds} seconds.`;
  
    const playerName = nameInput.value;
    const message = `Congratulations, ${playerName}! You completed the game in ${minutes} minutes and ${seconds} seconds.`;
    alert(message);
}

