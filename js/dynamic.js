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

//function to hide visible divs in html
function hideUnUsedDiv(){
    welcome_container.style.display="none";
    question_number.style.display="none"; 
    result_log.style.display="none";
    question_container.style.display="none";
    highscore_container.style.display="none"; 
}

//function to show visible divs in html
function unHideUnUsedDiv(){
    welcome_container.style.display="block";
    question_number.style.display="block"; 
    result_log.style.display="block";
    question_container.style.display="block";
    highscore_container.style.display="block"; 
}

//apply styling to the buttons 
highScoreButton.classList.add("btn", "btn-primary");

//apply background image
var body = document.querySelector("body");
body.style.backgroundImage = "url('https://images.unsplash.com/photo-1528458876861-544fd1761a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1442&q=80')";
// body.style.backgroundSize = "cover";


//create a welcome page
var welcomeDiv;
createWelcome();

function createWelcome() {
    //hide unused divs and show only once we need
    hideUnUsedDiv();
    welcome_container.style.display="block";

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
    welcomeH3.classList.add("text-center", "mb-4", "mt-4","pb-2", "border-bottom", "border-success");
    welcomeH3.textContent = "Coding Quiz Challenge";
    welcomeDiv.appendChild(welcomeH3);

    //description
    var welcomeRow2 = document.createElement("div");
    welcomeRow2.classList.add("row");
    var welcomeCol2 = document.createElement("div");
    welcomeCol2.classList.add("col-sm-12")
    var welcomePar = document.createElement("p");
    welcomePar.classList.add("text-center");
    welcomePar.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by 15sec";
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
        questionNumber();
    });
    
};

highScoreButton.addEventListener("click", function(){
    welcomeDiv.remove();
    highscorePage();
})

var scoreTracker;
var numberOfQuestions;

//create a page to request number of questions
function questionNumber() {
    //hide unused divs and show only once we need
    hideUnUsedDiv();
    question_number.style.display="block";

   var questionDiv = document.createElement("div");
    questionDiv.classList.add("text-center", "mt-3");

    var questionPrompt = document.createElement("h5");
    questionPrompt.classList.add("pb-2", "border-bottom", "border-success");
    var input = document.createElement("input");
    var buttonContainer = document.createElement("div");
    var submitButton = document.createElement("button");

    questionPrompt.textContent = "To start taking a quiz please enter number of questions : ";
    questionDiv.appendChild(questionPrompt);


    questionPrompt.classList.add("mt-3");
    input.classList.add("mt-3", "text-center");

    input.setAttribute("placeHolder", "# of questions (dflt = 5)");
    questionDiv.appendChild(input);

    submitButton.textContent = "Enter";
    buttonContainer.classList.add("text-center");
    submitButton.classList.add("btn", "btn-primary", "m-3");
    buttonContainer.appendChild(submitButton);
    questionDiv.appendChild(buttonContainer);

    question_number.appendChild(questionDiv);

    submitButton.addEventListener("click", function (event) {
        event.preventDefault;
        //make default number of questions if users clicks submit with out entering a value
        if(input.value ===""){
            numberOfQuestions = 5;
        }else{
        numberOfQuestions = parseInt(input.value);
    }
        questionDiv.remove();

        // function to keep track of time - starts countDown when user clicks on Enter Button
        var score = 0;
        //15 second per question 
        totalTimePermitted = 15 * numberOfQuestions;
        var scoreTracker = setInterval(function () {
            timerTrack.innerHTML = totalTimePermitted;
        
            if (totalTimePermitted <= 0) {
               //set score to 0 if user runs out of time
                finalScore = 0;
            }else{
            totalTimePermitted--;
            }
        }, 1000);

        //call to start displaying questions
        questionPage(numberOfQuestions);

    })
}


//create a page to display the questions
function questionPage(index) {
    //hide unused divs and show only once we need
    hideUnUsedDiv();
    question_container.style.display="block";

    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "custom_qstn_container");
    var questionDesc = document.createElement("p");
    var questionOL = document.createElement("ol");
    questionOL.setAttribute("class", "custom_ol");
    questionOL.setAttribute("id", "custom-ol-id");

    if (index > 0) {
        questionDesc.textContent = `${index}. ${questions[index].title}`;
    } else
    if (index === 0 && totalTimePermitted > 0 ) {
        finalScore = totalTimePermitted;
        clearInterval(scoreTracker);
        logResult(finalScore);
    } 
    else
    if(index >= 0 && totalTimePermitted <= 0){
        finalScore = 0;
        clearInterval(scoreTracker);
        logResult(finalScore);
    }

    questionDiv.appendChild(questionDesc);
    questionDiv.classList.add("mt-4");

     questionOL.setAttribute("type","a");
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
                // var resultDiv = document.createElement("div");
                // resultNotification.appendChild(resultDiv);
                resultNotification.textContent = `Wrong - correct answer was "${questions[index].answer}" - 15sec Penalty applied`;
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
    //hide unused divs and show only once we need
    hideUnUsedDiv();
    result_log.style.display="block";

    result_log.classList.add("text-center", "mt-3");

    var finishConfirmation = document.createElement("h5");
    var resultDisplay = document.createElement("p");
    var input = document.createElement("input");
    var buttonContainer = document.createElement("div");
    var submitButton = document.createElement("button");

    finishConfirmation.classList.add("pb-2", "border-bottom", "border-success")
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
        result_log.remove();
        clearInterval(scoreTracker);
        highscorePage();
    })

}


function highscorePage() {
    //hide unused divs and show only once we need
    hideUnUsedDiv();
    highscore_container.style.display="block";

    highscore_container.classList.add("text-center", "mt-3");

    var highscoreHeader = document.createElement("h5");
    highscoreHeader.classList.add("pb-2", "border-bottom", "border-success")
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