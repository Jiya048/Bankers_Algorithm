const questions = [

    {
        question: "What is the Banker's algorithm primarily used for in the context of operating systems?",
        answers: [
            { text: "CPU scheduling", correct: false },
            { text: "Deadlock detection", correct: true },
            { text: "Memory allocation", correct: false },
            { text: "File system management", correct: false },

        ]
    },

    {
        question: "Which data structure is commonly used in the Banker's algorithm to keep track of the available, maximum, and allocated resources?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: false },
            { text: "Matrix", correct: true },
            { text: "Linked List", correct: false },

        ]
    },
    {
        question: "What does it mean for a system to be in a 'safe state' according to the Banker's algorithm?",
        answers: [
            { text: "No processes are in the execution state", correct: true },
            { text: "Every process has its maximum claim satisfied", correct: false },
            { text: "No deadlock can occur, and all processes can complete", correct: false },
            { text: "All resources are fully utilized", correct: false },

        ]

    },

    {
        question: "What does it mean for a system to be in a 'safe state' according to the Banker's algorithm?",
        answers: [
            { text: "No processes are in the execution state", correct: false },
            { text: "Every process has its maximum claim satisfied ", correct: false },
            { text: "No deadlock can occur, and all processes can complete", correct: true },
            { text: "All resources are fully utilized", correct: false },

        ]

    },

    {
        question: "Which of the following is a function of the Banker's algorithm?",
        answers: [
            { text: "Release resources back to the system", correct: false },
            { text: "Allocate resources without checking safety", correct: false },
            { text: "Terminate a process", correct: false },
            { text: "Check if a resource request can be granted safely", correct: true },

        ]
    },

    {
        question: " What does the Banker's algorithm use to determine whether a resource request can be granted without leading to an unsafe state?",
        answers: [
            { text: " Maximum claim vector", correct: false },
            { text: "Allocation matrix", correct: false },
            { text: "Safety algorithm", correct: true },
            { text: "Request vector", correct: false },

        ]
    }


];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();


    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}



function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {


    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();