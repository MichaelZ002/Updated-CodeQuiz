// variables for starting the game and timer
var startbtn = document.getElementById('startbutton');
var instructions = document.getElementById('begin-text');
var timer = document.getElementById("timer");
var timerdiv = document.getElementById("countdown-timer");
var questiondiv = document.getElementById("question-container");
var i = 0;
var timerInterval;
var ending = document.getElementById("endingMessage");
var secondsLeft = 90;
var highscoresArr = JSON.parse(localStorage.getItem("scores")) || [];
var finalBtns = document.getElementById("finalBtns");

// Question objects
var questionArray = [
    {
        q: "Who Created Super Smash Brothers?",
        answer1: "Hideo Kojima",
        answer2: "Drake Bell",
        answer3: "Masahiro Sakurai",
        answer4: "Michael Zaslavsky",
        qanswer: "Masahiro Sakurai"
    },
    {
        q: "What Company made World of Warcraft?",
        answer1: "Nintendo",
        answer2: "Blizzard",
        answer3: "Rito Games",
        answer4: "H3H3",
        qanswer: "Blizzard"
    },
    {
        q: "What type of game is StartCraft 2?",
        answer1: "Table Top",
        answer2: "Its not a game",
        answer3: "Massive Multiplayer Online",
        answer4: "Real Time Staragy",
        qanswer: "Real Time Staragy"
    },
    {
        q: "Minecraft is wolrd where most things are what shape?",
        answer1: "Triangles",
        answer2: "Circle",
        answer3: "Cube",
        answer4: "Trapezoid",
        qanswer: "Cube"
    },
    {
        q: "What is the best song in Jet Set Raido Future?",
        answer1: "Concept of love",
        answer2: "Concept of love",
        answer3: "Concept of love",
        answer4: "Concept of love",
        qanswer: "Concept of love"
    }
];


startbtn.addEventListener('click', startGame);

// Starting the game function. Starts the timer and hides instructions when start is clicked
function startGame() {
    instructions.classList.add("hide");
    // ending.classList.add("hide");
    timerdiv.classList.remove("hide");
    scoreTimer();
    // show first question
    questiondiv.classList.remove("hide");
};

// Creating the timer
function scoreTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        displayQuestion();
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            alert("your out of time!")
            clearInterval(timerInterval);
        }
    }, 1000);
}

// function to display questions dynamically
function displayQuestion() {

    if (i < questionArray.length) {
        document.getElementById("questions").textContent = "";
        document.getElementById("btnAnswers").textContent = "";
        document.getElementById("answerMessage").textContent = "";

        var questionP = document.createElement("p")
        questionP.innerText = questionArray[i].q;
        document.getElementById("questions").appendChild(questionP)

        var answer1Btn = document.createElement("button")
        answer1Btn.innerText = questionArray[i].answer1;
        answer1Btn.setAttribute("class", "answer-btns btn btn-primary")
        document.getElementById("btnAnswers").appendChild(answer1Btn)

        var answer2Btn = document.createElement("button")
        answer2Btn.innerText = questionArray[i].answer2;
        answer2Btn.setAttribute("class", "answer-btns btn btn-primary")
        document.getElementById("btnAnswers").appendChild(answer2Btn)

        var answer3Btn = document.createElement("button")
        answer3Btn.innerText = questionArray[i].answer3;
        answer3Btn.setAttribute("class", "answer-btns btn btn-primary")
        document.getElementById("btnAnswers").appendChild(answer3Btn)

        var answer4Btn = document.createElement("button")
        answer4Btn.innerText = questionArray[i].answer4;
        answer4Btn.setAttribute("class", "answer-btns btn btn-primary")
        document.getElementById("btnAnswers").appendChild(answer4Btn)

        // when one of the answer buttons is clicked, check to see if it is the correct answer
        var buttons = document.querySelectorAll(".answer-btns")
        for (const button of buttons) {
            button.addEventListener('click', function (event) {
                if (button.innerHTML === questionArray[i].qanswer) {
                  i++
                   
                }
                else {
                    var incorrectMessage = document.createElement("img");
                    
                    secondsLeft -= 5;
                }
            })
        }
    }
    else {
        clearInterval(timerInterval);
        questiondiv.classList.add("hide");
        timerdiv.classList.add("hide");
        // grab timerinterval and set that as the score

        var congrats = document.createElement("H2");
        congrats.innerText = "Well Done!";
        document.getElementById("endingMessage").appendChild(congrats);

        var final = document.createElement("H4");
        final.innerText = "Your final score is: " + secondsLeft;
        document.getElementById("endingMessage").appendChild(final);

        var leaderboardForm = document.createElement("form");
        leaderboardForm.setAttribute("id", "submitScoreForm");
        var formLabel = document.createElement("label");
        var formInput = document.createElement("input");
        var formButton = document.createElement("button");
        formButton.setAttribute("class", "btn btn-primary submitBtn");
        formButton.setAttribute("id", "submit-score");
        formButton.setAttribute("type", "submit");
        formLabel.innerText = "Initials: ";
        formButton.innerText = "Submit";
        leaderboardForm.appendChild(formLabel);
        leaderboardForm.appendChild(formInput);
        leaderboardForm.appendChild(formButton);
        ending.appendChild(leaderboardForm);




        // adding event listener to submit high scores...
        var submitScore = document.getElementById("submit-score");
        submitScore.addEventListener('click', function (event) {
            event.preventDefault();
            endingMessage.innerText = "";

            // adding leaderboard title and inserting into DOM
            var leaderboardForm = document.getElementById("leaderboardHead");
            var leaderboardTitle = document.createElement("h4");
            leaderboardTitle.innerText = "Leaderboard:";
            leaderboardForm.appendChild(leaderboardTitle);

            // pushing score into the leaderboard. if initials input is empty, do not push it to the leaderboard
            if (formInput.value !== "") {
                highscoresArr.push(formInput.value + " " + " - " + secondsLeft);
                localStorage.setItem("scores", JSON.stringify(highscoresArr));
            }

            for (var i = 0; i < highscoresArr.length; i++) {
                var li = document.createElement('li');
                li.innerText = highscoresArr[i];
                ending.appendChild(li);
            }


            // creating play again button
            var playAgainBtn = document.createElement("button");
            playAgainBtn.setAttribute("class", "submitBtn btn btn-primary submitBtn");
            playAgainBtn.setAttribute("id", "restart");
            playAgainBtn.innerText = "Play Again";
            finalBtns.appendChild(playAgainBtn);

            // creating clear scores button
            var clearScores = document.createElement("button");
            clearScores.setAttribute("class", "submitBtn btn btn-primary submitBtn");
            clearScores.setAttribute("id", "clearHighScores");
            clearScores.innerText = "Clear Scores";
            finalBtns.appendChild(clearScores);

            // adding event listener to play again button
            var playAgain = document.getElementById("restart");
            playAgain.addEventListener("click", function () {
                leaderboardForm.textContent = "";
                finalBtns.textContent = "";
                ending.textContent = "";
                reset();
                startGame();
            })

            // adding event listener to clear the leaderboard
            var clearHighScores = document.getElementById("clearHighScores");
            clearHighScores.addEventListener("click", function () {
                highscoresArr.length = 0;
                ending.textContent = "";
                console.log(highscoresArr);
            })

        })

    }
}


function reset() {
    secondsLeft = 120;
    i = 0;
    timerInterval;
}