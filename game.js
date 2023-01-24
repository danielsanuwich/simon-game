var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Add click event listener for whole document
$(".btn").click(function () {
  //Handler function below to store id of button that got clicked
  var userChosenColour = $(this).attr("id");
  //Insert to emptyarray
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  //Flash color according to clicked button
  //Select button with same id as randomChosenColor
  $("#" + userChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(userChosenColour);
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("gamePattern is " + gamePattern);
    console.log("success");
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
    $("h1").text("Game Over, Press Any Key to restart");
    //Game over CSS
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
    console.log("wrong");
  }
}

//Function to select random color
function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //Each time function is called level up/means person succeeded
  level++;
  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  //Insert to emptyarray
  gamePattern.push(randomChosenColour);

  console.log(randomNumber);
  console.log(randomChosenColour);

  //Flash color according to fetched random color
  //Select button with same id as randomChosenColour
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

//play sound according to color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables. NOTE no need to say var level = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
