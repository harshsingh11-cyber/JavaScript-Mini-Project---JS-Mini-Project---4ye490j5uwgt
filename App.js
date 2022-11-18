const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

var hr = 0 ;
var min = 0;
var sec = 0;
var count = 0;
var max = 0;
let timer = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }

}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 5000);
            setTimeout(() => {
                return stope();
            }, 10);
            setTimeout(() => {
                return reset();
            }, 5000);

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

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);

    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
    card.addEventListener("click", start);
});

function start() {
    timer = true;
    stopWatch();

}

function stopWatch() {
    if (timer == true) {

        count += 1;

        if (count == 100) {
            sec += 1;
            count = 0;
        }
        if(sec == 60){
            min+=1;
            sec = 0;
        
        }
        if(min == 60){
            hr+=1;
            min = 0;
            sec = 0;
        }
        var minStr = min;
        var hrStr = hr;
        var secStr = sec;
        // var countStr = count;
          

        if (sec < 10) {
            secStr = "0" + secStr;
        }
        if (min < 10) {
            minStr = "0" + minStr;
        }
        if (hr < 10) {
            hrStr = "0" + hrStr;
        }

        document.getElementById('sec').innerHTML = secStr;
        document.getElementById('min').innerHTML = minStr;
        document.getElementById('hr').innerHTML = hrStr;

        // document.getElementById('count').innerHTML = countStr;
        setTimeout('stopWatch()',200);
    }

}
function stope() {
    timer = false;
}
function reset() {
    timer = false;
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('hr').innerHTML = "00";
}