//capture the navbar elements
var highScoreButton = document.getElementById("highScore");
var startQuizButton = document.getElementById("startQuiz");
var timerDisplay = document.querySelector(".timer");

var content_page = document.querySelector("content_page")
var content = document.querySelectorAll(".content");
var question_number = document.querySelector(".question_number");
var question_container = document.querySelector(".question_container");
var welcome_container = document.querySelector(".welcome_container");

//apply styling to the buttons 
highScoreButton.classList.add("btn", "btn-primary");


function createWelcome() {
    //create welcome page
    //header
    var welcomeRow = document.createElement("div");
    welcome_container.appendChild(welcomeRow);
    welcomeRow.classList.add("row");
    var welcomeCol = document.createElement("div");
    welcome_container.appendChild(welcomeCol);
    welcomeCol.classList.add("col-sm-12")
    var welcomeH3 = document.createElement("h3");
    welcomeH3.classList.add("text-center", "mb-4", "mt-4");
    welcomeH3.textContent = "Coding Quiz Challenge";
    welcome_container.appendChild(welcomeH3);

    //description
    var welcomeRow2 = document.createElement("div");
    welcomeRow2.classList.add("row");
    var welcomeCol2 = document.createElement("div");
    welcomeCol2.classList.add("col-sm-12")
    var welcomePar = document.createElement("p");
    welcomePar.classList.add("text-center");
    welcomePar.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect anwers will penalize your scoretime by 10sec";
    welcome_container.appendChild(welcomeRow2);
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
    welcome_container.appendChild(welcomeRow3);
    welcomeRow3.appendChild(welcomeCol3);
    welcomeCol3.appendChild(startQuizButton);

};

createWelcome();
//add eventlistner

startQuizButton.addEventListener("click", function () {

    content[0].remove();
    questionNumber();

})



var numberOfQuestions;

//create a page to request number of questions
function questionNumber() {
    question_number.classList.add("text-center", "mt-3");

    var questionPrompt = document.createElement("h5");
    var input = document.createElement("input");
    var buttonContainer = document.createElement("div");
    var submitButton = document.createElement("button");

    questionPrompt.textContent = "To start taking a quiz please enter number of questions : ";
    question_number.appendChild(questionPrompt);


    questionPrompt.classList.add("mt-3");
    input.classList.add("mt-3");

    input.setAttribute("placeHolder", "number of questions");
    question_number.appendChild(input);

    submitButton.textContent = "Enter";
    buttonContainer.classList.add("text-center");
    submitButton.classList.add("btn", "btn-primary", "m-3");
    buttonContainer.appendChild(submitButton);
    question_number.appendChild(buttonContainer);


    submitButton.addEventListener("click", function (event) {
        event.preventDefault;
        numberOfQuestions = parseInt(input.value);
        content[1].remove();
        questionPage(numberOfQuestions);
    })
}



//create a page to display the questions
function questionPage(index) {
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "custom_qstn_container");
    var questionDesc = document.createElement("p");
    var questionOL = document.createElement("ol");
    questionOL.setAttribute("class", "custom_ol");
    questionOL.setAttribute("id", "custom-ol-id");

    if(index > 0){
    questionDesc.textContent = `${index}. ${questions[index].title}`;
    }
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
            question_container.removeChild(custom_qstn_container);
            numberOfQuestions = numberOfQuestions - 1;
            questionPage(numberOfQuestions);
        }
    });
}