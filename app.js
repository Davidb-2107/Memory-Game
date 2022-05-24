//Array of Objects
const cardArray = [
    {
        name: "fries",
        img:"images/fries.png",
    },
    {
        name: "cheesburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png",
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png",
    },
    {
        name: "milkshake",
        img: "images/milkshake.png",
    },
    {
        name: "pizza",
        img: "images/pizza.png",
    },
    //2d series
    {
        name: "fries",
        img:"images/fries.png",
    },
    {
        name: "cheesburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png",
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png",
    },
    {
        name: "milkshake",
        img: "images/milkshake.png",
    },
    {
        name: "pizza",
        img: "images/pizza.png",
    },
   
];

//sort an array randomly
const sortArray = cardArray.sort( () => 0.5 - Math.random());
console.log(sortArray);


//Empty Arrays variables
let cardsChosen = [];
let cardsChosenIds = [];
let cardWon = []


//Global Variables
const gridDisplay = document.querySelector("#grid");
let score = 1;
let interval = null;
let counter = 0;


//__________________________________________

//#Functions Part

//## Function createBoard
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        
        //Create an element <img> using the createElement method 
        const card = document.createElement("img");

        //Set the "src" attribute to the created image element
        card.src = "images/blank.png";

        //Set an id of "data-id" based on the index
        card.setAttribute("data-id", i);
        
        //Identified wich container aka "div" to append img elements to
        gridDisplay.append(card);

        //Flip card on click
        card.addEventListener("click", flipCard);

        
    }
}

createBoard();

//## Function flipCard - called everytime a card is clicked
function flipCard() {

    //Whatever element will be clicked, I wanna get his attribute
    const cardId = this.getAttribute("data-id");

    //Return the name of the object name clicked and push it to the cardChosen array
    cardsChosen.push(cardArray[cardId].name);
    
    //Return the cardId and push it id to the cardsChosenIds array
    cardsChosenIds.push(cardId)

    //Add the img property to the flipped card
    this.setAttribute("src", cardArray[cardId].img);

    //Add 0.5seconds before checkMatch function is called
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500) 
    }

    //Start timer 
    //Check if counter is running and return if true
    if (interval) {
        return
    //If counter it's not running, call the increaseTimer function
    } else {
        interval =  setInterval(increaseTimer, 1000);
    } 
}


//## Function - CheckMatch
function checkMatch() {
     //Search for every image in the #grid
     const cards = document.querySelectorAll("#grid img");

     //if it's a match
    if (cardsChosen[0] === cardsChosen[1]) {
       
        document.querySelector("#result").textContent = score++;
    cards[cardsChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    cardWon.push(cardsChosen[0], cardsChosen[1]);
    

    //if not a match
    } else {
        cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
        cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    };


    //Empty Arrays again
    cardsChosen = [];
    cardsChosenIds = [];

    //What happens when all cards are found
    if (cardWon.length === cardArray.length) {
        document.querySelector("#result").textContent = "Congratulations you won"
        clearInterval(interval);
        document.querySelector("#totalTime").textContent = "Your total time: ";
    }
}



//## Timer function - Start at the first click (when flipCard() is called) and increase seconds
function increaseTimer() {

    //## IIFE - Function used to format the countdown display 
    (function() {
        hrs = Math.floor(counter / 3600); //1hour = 3600seconds
        mins = Math.floor((counter - (hrs * 3600)) / 60); //1min = 60 seconds
        secs = counter % 60
    
        if (secs < 10) {
            secs = "0" + secs
        };
        if (mins < 10) {
            mins = "0" + mins
        };
        
        ////Select the timer div element & Display the counter
        document.querySelector("#timer").innerText = `${mins}:${secs}`;
    })();

    //Add 1 to the counter variable
    counter++;
};




