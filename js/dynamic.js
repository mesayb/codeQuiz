//capture the navbar elements
var highScoreButton = document.getElementById("highScore");
var startQuizButton = document.getElementById("startQuiz");
var timerDisplay = document.querySelector(".timer");
var timerTrack = document.getElementById("timerTrack");

var content_page = document.querySelector("content_page")
var content = document.querySelectorAll(".content");
var question_number = document.querySelector(".question_number");
var result_log = document.querySelector(".result_log");
var question_container = document.querySelector(".question_container");
var welcome_container = document.querySelector(".welcome_container");
var highscore_container = document.querySelector(".highscore_container");

var totalTimePermitted;
var finalScore;
var quizResultRecord;

//apply styling to the buttons 
highScoreButton.classList.add("btn", "btn-primary");

var welcomeDiv;
createWelcome();

function createWelcome() {
    //create welcome page
    welcomeDiv = document.createElement("div");
    //header
    var welcomeRow = document.createElement("div");
    welcomeDiv.appendChild(welcomeRow);
    welcomeRow.classList.add("row");
    var welcomeCol = document.createElement("div");
    welcomeDiv.appendChild(welcomeCol);
    welcomeCol.classList.add("col-sm-12")
    var welcomeH3 = document.createElement("h3");
    welcomeH3.classList.add("text-center", "mb-4", "mt-4");
    welcomeH3.textContent = "Coding Quiz Challenge";
    welcomeDiv.appendChild(welcomeH3);

    //description
    var welcomeRow2 = document.createElement("div");
    welcomeRow2.classList.add("row");
    var welcomeCol2 = document.createElement("div");
    welcomeCol2.classList.add("col-sm-12")
    var welcomePar = document.createElement("p");
    welcomePar.classList.add("text-center");
    welcomePar.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect anwers will penalize your scoretime by 10sec";
    welcomeDiv.appendChild(welcomeRow2);
    welcomeRow2.appendChild(welcomeCol2);
    welcomeCol2.appendChild(welcomePar);

    //button
    var welcomeRow3 = document.createElement("div");
    welcomeRow3.classList.add("row");
    var welcomeCol3 = document.createElement("div");
    welcomeCol3.classList.add("col-sm-12", "text-center")
    startQuizButton = document.createElement("button");
    startQuizButton.classList.add("btn", "btn-primary", "mb-4", "mt-2");
    startQuizButton.textContent = "Start Quiz";
    welcomeDiv.appendChild(welcomeRow3);
    welcomeRow3.appendChild(welcomeCol3);
    welcomeCol3.appendChild(startQuizButton);

    welcome_container.appendChild(welcomeDiv);

    //add eventlistner

    startQuizButton.addEventListener("click", function () {
        welcomeDiv.remove();
        //content[0].remove();
        questionNumber();
    })
};

highScoreButton.addEventListener("click", function(){
    welcomeDiv.remove();
    highscorePage();
})




var numberOfQuestions;
//var questionDiv;
//create a page to request number of questions
function questionNumber() {
   var questionDiv = document.createElement("div");
    questionDiv.classList.add("text-center", "mt-3");

    var questionPrompt = document.createElement("h5");
    var input = document.createElement("input");
    var buttonContainer = document.createElement("div");
    var submitButton = document.createElement("button");

    questionPrompt.textContent = "To start taking a quiz please enter number of questions : ";
    questionDiv.appendChild(questionPrompt);


    questionPrompt.classList.add("mt-3");
    input.classList.add("mt-3");

    input.setAttribute("placeHolder", "number of questions");
    questionDiv.appendChild(input);

    submitButton.textContent = "Enter";
    buttonContainer.classList.add("text-center");
    submitButton.classList.add("btn", "btn-primary", "m-3");
    buttonContainer.appendChild(submitButton);
    questionDiv.appendChild(buttonContainer);

    question_number.appendChild(questionDiv);

    submitButton.addEventListener("click", function (event) {
        event.preventDefault;
        numberOfQuestions = parseInt(input.value);
        questionDiv.remove();
        // content[1].remove();

        // function to keep track of time - starts countDown when user clicks on Enter Button
        var score = 0;
        //15 second per question 
        totalTimePermitted = 15 * numberOfQuestions;
        scoreTracker;

        //call to start displaying questions
        questionPage(numberOfQuestions);

    })
}

var scoreTracker = setInterval(function () {
    timerTrack.innerHTML = totalTimePermitted;

    if (totalTimePermitted <= 0) {
        //remove an answered question
        question_container.remove();
        finalScore = 0;

        logResult(finalScore);
        clearInterval(scoreTracker);
    };
    totalTimePermitted--;
}, 1000);

//create a page to display the questions
function questionPage(index) {

    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "custom_qstn_container");
    var questionDesc = document.createElement("p");
    var questionOL = document.createElement("ol");
    questionOL.setAttribute("class", "custom_ol");
    questionOL.setAttribute("id", "custom-ol-id");
    console.log("index q = " + index);
    if (index > 0) {
        questionDesc.textContent = `${index}. ${questions[index].title}`;
    } else
    if (index === 0) {
        finalScore = totalTimePermitted;
        clearInterval(scoreTracker);
        logResult(finalScore);
    }
    //  else
    // if(totalTimePermitted < 0){
    //     console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    //     finalScore = 0;
    //     clearInterval(scoreTracker);
    //     logResult(finalScore);
    // } 
    questionDiv.appendChild(questionDesc);
    questionDiv.classList.add("mt-4");

    //  questionOL.setAttribute("type","a");
    questionDiv.appendChild(questionOL);

    for (var i = 0; i < questions[index].choices.length && index > 0; i++) {
        var questionLI = document.createElement("li");
        questionLI.textContent = questions[index].choices[i];
        questionLI.classList.add("btn", "btn-light", "d-flex", "mb-3");
        questionOL.appendChild(questionLI);
    }

    //append ol to the question container div
    question_container.appendChild(questionDiv);

    //capture the div 
    var custom_qstn_container = document.querySelector(".custom_qstn_container");

    custom_qstn_container.addEventListener("click", function (event) {
        if ((event.target.nodeName) === "LI") {
            event.target.style.backgroundColor = "#4ae5e8";
            var answer = event.target.innerText;
            if (answer === questions[index].answer) {
                var resultNotification = document.createElement("div");
                resultNotification.classList.add("bg-success", "text-center")
                var span = document.createElement("span");
                resultNotification.appendChild(span);
                span.textContent = "Correct";
                question_container.appendChild(resultNotification);

            } else {
                var resultNotification = document.createElement("div");
                resultNotification.classList.add("bg-danger", "text-center")
                var span = document.createElement("span");
                resultNotification.appendChild(span);
                span.textContent = `Wrong - correct answer was "${questions[index].answer}" - 10sec Penalty applied`;
                question_container.appendChild(resultNotification);
                totalTimePermitted = totalTimePermitted - 13;
            }

            //function to clear the question page 
            function clearQuestionContent() {
                question_container.removeChild(custom_qstn_container);
                question_container.removeChild(resultNotification);
                numberOfQuestions = numberOfQuestions - 1;
                questionPage(numberOfQuestions);
            }
            setTimeout(clearQuestionContent, 1000);
        }
    });
}



// function to create a result logging page

function logResult(result) {
    result_log.classList.add("text-center", "mt-3");

    var finishConfirmation = document.createElement("h5");
    var resultDisplay = document.createElement("p");
    var input = document.createElement("input");
    var buttonContainer = document.createElement("div");
    var submitButton = document.createElement("button");

    finishConfirmation.textContent = "All Done !!";
    result_log.appendChild(finishConfirmation);

    resultDisplay.textContent = `Your Score is ${result}`;
    result_log.appendChild(resultDisplay);

    finishConfirmation.classList.add("mt-3");
    input.classList.add("mt-3");

    input.setAttribute("placeHolder", "Please enter your Initials");
    result_log.appendChild(input);

    submitButton.textContent = "Submit";
    buttonContainer.classList.add("text-center");
    submitButton.classList.add("btn", "btn-primary", "m-3");
    buttonContainer.appendChild(submitButton);
    result_log.appendChild(buttonContainer);

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        var date = (new Date()).toUTCString();
        quizResultRecord = {
            initials: input.value.trim(),
            score: finalScore,
            date: date,
        };
        localStorage.setItem("quizResultRecord", JSON.stringify(quizResultRecord));
        var rec = localStorage.getItem("quizResultRecord");
        console.log(rec);
        result_log.remove();
        highscorePage();
    })

}


function highscorePage() {
    highscore_container.classList.add("text-center", "mt-3");

    var highscoreHeader = document.createElement("h5");
    highscoreHeader.textContent = "Highscores";
    highscore_container.appendChild(highscoreHeader);

    var ol = document.createElement("ol");

    var quizResultRecord2 = JSON.parse(localStorage.getItem("quizResultRecord"))


    var highScorer = document.createElement("p");
    highScorer.textContent = `1. ${quizResultRecord2.initials} = ${quizResultRecord2.score} `;

    highscore_container.appendChild(highScorer);

    var buttonContainer = document.createElement("div");
    var goBackButton = document.createElement("button");
    var clearHighscoreButton = document.createElement("button");

    buttonContainer.classList.add("text-center");
    goBackButton.textContent = "Go Back";
    goBackButton.classList.add("btn", "btn-primary", "m-3", "go_back");
    buttonContainer.appendChild(goBackButton);
    highscore_container.appendChild(buttonContainer);

    clearHighscoreButton.textContent = "Clear Highscore";
    clearHighscoreButton.classList.add("btn", "btn-primary", "m-3");
    buttonContainer.appendChild(clearHighscoreButton);
    highscore_container.appendChild(buttonContainer);

    // var clearHighscoreButtonSelect = document.querySelector(".go_back");
    clearHighscoreButton.addEventListener("click", function () {
        localStorage.removeItem("quizResultRecord");
        highscore_container.remove();
        createWelcome();
    });

    goBackButton.addEventListener("click", function () {
        highscore_container.remove();
        createWelcome();
    });

}

//function to store user result