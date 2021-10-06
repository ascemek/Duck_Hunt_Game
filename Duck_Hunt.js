/*
DUCK HUNT GAME
@author: Sami Cemek
Updated: 03/2019
*/

// GLOBAL VARIABLES
var lives = 3;
var score = 0;
var randomXmovement;
var randomYmovement;
var switchCountdown = 0;

moveDuck();
hideElement("dog");
hideElement("greenBird");
level_labels();

// LEVEL LABELS ON THE GAME SCREEN
function level_labels() {
  if (score < 10) {
  hideElement("mediumtag");
  hideElement("hardtag");
  showElement("easytag"); 
  } else if (score == 10) {
  hideElement("easytag");
  hideElement("hardtag");  
  showElement("mediumtag");
  } else if (score >= 20) {
  hideElement("mediumtag");
  hideElement("easytag");  
  showElement("hardtag"); 
  }
}


// SELECT A USERNAME AND A CHARACTER
onEvent("submitbtn", "click", function( ) {
var userName = getText("inputName") ;
userName = userName.toUpperCase();
var userMesssage = (("Hello "+ userName) + " Welcome to Duck Hunt!" + 
" Let's take a look at the rules and how to play!");
setText("text_area", userMesssage);
});


// CLICK DUCK GAME
function moveDuck() {
  onEvent("duck", "click", function() {
    setPosition("duck", randomNumber(50,280), randomNumber(50, 350));
  });
  onEvent("startbtn", "click", function( ) {
    lives = 3;
    score = 0;
    setText("numberLives", lives);
    setText("numberScore", score);
  });
}

// If you click on the background, you will lose 1 life
onEvent("background", "click", function() {
    lives = lives - 1;
    setText("numberLives", lives);
    if (lives == 0) {
      setScreen("(7)gameOver");
      playSound("Game-Over-Sound.mp3", false);
    }
  });
// If you click on the dog, you will lose 1 life 
onEvent("dog", "click", function() {
    lives = lives - 1;
    setText("numberLives", lives);
    if (lives == 0) {
      setScreen("(7)gameOver");
      playSound("Game-Over-Sound.mp3", false);
    }
  });
//  If you click on the green bird, you will lose 1 life
onEvent("greenBird", "click", function() {
    lives = lives - 1;
    setText("numberLives", lives);
    if (lives == 0) {
      setScreen("(7)gameOver");
      playSound("Game-Over-Sound.mp3", false);
    }
  });
// If you click on the duck, the score increases one
onEvent("duck", "click", function( ) {
    score = score + 1;
    setProperty("finalScoreTextArea", "text", score);
    setProperty("gameOverTextArea", "text", score);
    setText("numberScore", score);
    level_labels();
    if (score == 10) {
      setScreen("(0)transitions");
      hideElement("mediumHardArrow");
      hideElement("hardLabel");
      hideElement("hardTransBtn");
      showElement("dog");
      showElement("easyLabel");
      showElement("easyMediumArrow");
      showElement("mediumTransBtn");
      level_labels();
    } else if (score == 20) {
     setScreen("(0)transitions");
     hideElement("easyMediumArrow");
     hideElement("easyLabel");
     hideElement("mediumTransBtn");
     showElement("hardLabel");
     showElement("hardTransBtn");
     showElement("mediumHardArrow");
     showElement("greenBird");
     level_labels();
    } else if (score == 30) {
      level_labels();
      setScreen("(8)youWon");
      playSound("UEFA-Champions-League-anthem-stadium.mp3", false);
    }
  });
  
// MOVE DOG BACK AND FORTH
moveDog("dog");
wrapAround("dog");

function moveDog(image) {
  var dogXLocation = 1;
  timedLoop(10, function() {
    dogXLocation = dogXLocation + 1 ;
    setPosition(image, dogXLocation, 180);
    if (dogXLocation > 330) {
      dogXLocation = -90;
    }
  });
}

function wrapAround(image) {
var dogX = getXPosition(image);
var dogY = getYPosition(image);
var dogHeight = getProperty(image, "height");
var dogWidth = getProperty(image, "width");


if (dogX > 320 - (dogWidth / 2)) {
dogX = 0 - (dogWidth / 2 );

} else if (dogX < 0 - (dogWidth / 2)) {
dogX = 320 - (dogWidth / 2 );

} else if (dogY > 450 - (dogHeight / 2)) {
dogY = 0 - (dogHeight / 2 );

} else if (dogY < 0 - (dogHeight / 2)) {
dogY = 450 - (dogHeight / 2 );   
}
setPosition(image, dogX, dogY);
}

// WANDER THE GREEN BIRD RANDOMLY
onEvent("hardTransBtn", "click", function( ) {
timedLoop(60, function() {
  moveGreenBird();
});  
});

function moveGreenBird(){
var birdXLocation = getXPosition("greenBird");
var birdYLocation = getYPosition("greenBird");
birdXLocation = birdXLocation + randomXmovement;
birdYLocation = birdYLocation + randomYmovement;
setPosition("greenBird", birdXLocation, birdYLocation);

switchCountdown--;
if(switchCountdown <= 0){
  assignDirection();  
}
checkBounce();
}

function assignDirection() {
randomXmovement = randomNumber(-5,5);
randomYmovement = randomNumber(-5,5);
switchCountdown = randomNumber(10,50);

if (randomXmovement == 0 && randomYmovement == 0){
  assignDirection();
 }
}

function checkBounce(){
  var birdHeight = getProperty("greenBird", "height");
  var birdWidth = getProperty("greenBird", "width");
  var birdXLocation = getXPosition("greenBird");
  var birdYLocation = getYPosition("greenBird");
  

  if (birdYLocation <= 0 ) {
    randomYmovement = 5;
  }
  if (birdYLocation >= 450 - birdHeight) {
    randomYmovement = -5;
  }
    if (birdXLocation <= 0) {
    randomXmovement = 5;
  }
  if (birdXLocation >= 320 - birdWidth ) {
    randomXmovement = -5;
  }

}

// ON EVENT CODES
onEvent("mediumTransBtn", "click", function() {
setScreen("(6)hard");
});
onEvent("hardTransBtn", "click", function() {
setScreen("(6)hard");
});
onEvent("startbtn", "click", function() {
setScreen("(2)pickcharacter");
});
onEvent("letsGoBtn", "click", function() {
setScreen("(6)hard");  
});
onEvent("tryagainBtn", "click", function() {
setScreen("(1)beginning");    
});
onEvent("mainMenuBtn", "click", function() {
setScreen("(1)beginning");    
});
onEvent("girlbtn", "click", function() {
  setScreen("(3)welcome"); 
});
onEvent("boybtn", "click", function() {
  setScreen("(3)welcome"); 
});
onEvent("playAgain", "click", function() {
  setScreen("(1)beginning");
  stopSound("UEFA-Champions-League-anthem-stadium.mp3");
  score = 0;
  lives = 3;
  hideElement("dog");
  hideElement("greenBird");
  level_labels();
});
onEvent("tryagainBtn", "click", function() {
  setScreen("(1)beginning");
  score = 0;
  lives = 3;
  hideElement("dog");
  hideElement("greenBird");
  level_labels();
});