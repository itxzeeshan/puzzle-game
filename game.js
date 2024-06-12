const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let availableQuestions = [];

let questions = [
    {
        "question": "Inside which HTML element do we put the JavaScript??",
        "choice1": "<script>",
        "choice2": "<javascript>",
        "choice3": "<js>",
        "choice4": "<scripting>",
        "answer": 1
      },
      {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "choice1": "<script href='xxx.js'>",
        "choice2": "<script name='xxx.js'>",
        "choice3": "<script src='xxx.js'>",
        "choice4": "<script file='xxx.js'>",
        "answer": 3
      },
      {
        "question": " How do you write 'Hello World' in an alert box?",
        "choice1": "msgBox('Hello World');",
        "choice2": "alertBox('Hello World');",
        "choice3": "msg('Hello World');",
        "choice4": "alert('Hello World');",
        "answer": 4
        
      },
      {
        "question": " Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
        "choice1": "Microsoft",
        "choice2": "Atari",
        "choice3": "Commodore",
        "choice4": "Apple",
        "answer": 4 
      },
      {
        "question": " What does the 'MP' stand for in MP3?",
        "choice1": "Music Player",
        "choice2": "Multi Pass",
        "choice3": "Micro Point",
        "choice4": "Moving Picture",
        "answer": 3
      },
      {
        "question": " In any programming language, what is the most common way to iterate through an array?",
        "choice1": "'if'Statements",
        "choice2": "'Do-While'loops",
        "choice3": "'For'loops",
        "choice4": "'While'loops",
        "answer": 3
      },
      {
        "question": "HTML is what type of language?",
        "choice1": "Programming Language",
        "choice2": "Macro Language",
        "choice3": "Scripting Language",
        "choice4": "Markup Language",
        "answer": 4
      },
      {
        "question": "In web design, what does CSS stand for?",
        "choice1": "Counter Strike:Source",
        "choice2": "Cascading Style Sheet",
        "choice3": "Corrective Style Sheet",
        "choice4": "Computer Style Sheet",
        "answer": 2
      },
      {
        "question": "What language does Node.js use?",
        "choice1": "Java",
        "choice2": "JavaScript",
        "choice3": "Java Source",
        "choice4": "Joomla Source Code",
        "answer": 2
      },
      {
        "question": "What does CPU stand for?",
        "choice1": "Central Processing Unit",
        "choice2": "Computer Personal Unit",
        "choice3": "Centra Processor Unit",
        "choice4": "Central Processing Unit",
        "answer": 4
      }
];



// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >=MAX_QUESTION){
        localStorage.setItem("mostRecentScore",score);
        // go to the end page
        return window.location.assign("./end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`; 
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true; 

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};



startGame();