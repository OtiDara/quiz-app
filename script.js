 //Create the quiz data- define questions and answers in an array. 
 // Array of questions and answers. Each question has an array of answer object.
 //Each answer object contains the text of the and whether its correct.
 const questions = [
    {
        question: "which organ functions after death?", //The quiz question
        answers:[ // possible answers for the question
             {text: "Skin", correct: false}, // answer object, false indicates incorrect.
             {text: "Nose", correct: false},
             {text: "Heart", correct: false},
             {text: "Brain", correct: true},
        ]

    },
    {
        question: "what is the cleanest part of the human body?",
        answers:[
             {text: "Tongue", correct: false},
             {text: "Nose", correct: false},
             {text: "Hands", correct: false},
             {text: "Eyes", correct: true},
        ] 
    },
    {
        question: "what is the hardest part of the human body?",
        answers:[
             {text: "Skull", correct: false},
             {text: "Nose", correct: false},
             {text: "Femur", correct: false},
             {text: "Teeth", correct: true},
        ]
    },
    {
        question: "what is the main muscle used for breathing?",
        answers:[
             {text: "Biceps", correct: false},
             {text: "Quadriceps", correct: false},
             {text: "Bone", correct: false},
             {text: "Diaphragm", correct: true},
        ]
    },
    {
        question: "what is the hormone of pleasure?",
        answers:[
             {text: "Adrenaline", correct: false},
             {text: "Love", correct: false},
             {text: "Insulin", correct: false},
             {text: "Dopamine", correct: true},
        ] 
    },
    {
        question: "which hormone regulates blood sugar level?",
        answers:[
             {text: "Cortisol", correct: false},
             {text: "Insulin", correct: true},
             {text: "Estrogen", correct: false},
             {text: "Dopamine", correct: false},
        ] 
    }
    
];
// DOM elements: grab the html elements where the question, answer buttons, and next buttons are displayed.

const questionElement = document.getElementById("question"); // Element to display the question
const answerButtons = document.getElementById("answer-buttons"); //container for the answer buttons
const nextButton = document.getElementById("next-btn"); // next button element

//initailize the current question index and the score.
let currentQuestionIndex = 0;
let score = 0;


//start the quiz function
function startQuiz(){
    currentQuestionIndex = 0; // reset question index to 0
    score = 0;  // reset the score to zero       
    nextButton.innerHTML = "Next"; // set the initial label for the next button
    showQuestion();   //show the first question
}
//display the current question and its answer options
function showQuestion(){
    resetState();   //clear previous amswers and hide the next button
    let currentQuestion = questions[currentQuestionIndex]; // get current question
    let questionNo = currentQuestionIndex + 1;  // display question number 
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question; // show question test
     
    //create buttons for each answer option
    currentQuestion.answers.forEach(answer => {
       const button =document.createElement("button");// create a new button element
       button.innerHTML = answer.text; // set the button text to the answer text
       button.classList.add("btn") //add a class for styling
       answerButtons.appendChild(button); //add the button to the answerbuttons container

       //if the answer is correct, store that info in the button's dataset for later use
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }

       //add a click event listener for when the user selects an answer 
       button.addEventListener("click", selectAnswer);
    });
}

//function to reset the UI before showing a new question
function resetState(){
    nextButton.style.display ="none"; //hide the next button untill an answer is seleted 
    while(answerButtons.firstChild){ //Remove any previously displayed answer buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//function to handle answer selection
function selectAnswer(e){
    const selectedBtn = e.target; // get the button that was clicked 
    const isCorrect = selectedBtn.dataset.correct === "true";// check if the selected answer is correct

    //if the answer is correct, highlight the button as the correct and increment score
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");//if wrong highlight as incorrect
    }

    //show correct answers for all buttons and disable further clicks 
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); //highlight correct answer's 
        }
        button.disabled =true; // disable all buttons to prevent more clicks 
    });
    nextButton.style.display ="block"; // show the next button after an answer is selected 
}

//function to display the final score after the quiz ends
function showscore(){
    resetState(); // clear the previous state 
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"; // change the next button to a "play again" button 
    nextButton.style.display ="block"; // make the play again button visible 
}
// function to handle what happens when the next button is clicked 
function handleNextButton(){
    currentQuestionIndex++; // move to the next question
    if(currentQuestionIndex < questions.length){
        showQuestion(); // show the next question if there are more questions 
    }else{
        showscore(); // otherwise , show the score when the quiz is finished 
    }
}
// event listener for the next button to either show the next question or restart the quiz
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton() //go to the next question
  }else{
    startQuiz(); //restart the quiz if its over 
  }
});
//start the quiz when the page loads 
startQuiz();