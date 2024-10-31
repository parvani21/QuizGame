const questions = {
    easy: [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: 2,
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 1,
        },
    ],
    medium: [
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
            answer: 0,
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: 3,
        },
    ],
    hard: [
        {
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
            answer: 1,
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            answer: 2,
        },
    ],
};

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 15;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const difficultySelect = document.getElementById("difficulty");
const quizContainer = document.getElementById("quiz-container");
const categoryContainer = document.getElementById("category-container");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = `Score: ${score}`;
    resultContainer.classList.add("hidden");
    categoryContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startTimer();
    loadQuestion();
}

function startTimer() {
    let timeLeft = totalTime;
    timeElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.classList.remove("hidden");
            showCorrectAnswer();
        }
    }, 1000);
}

function loadQuestion() {
    const selectedDifficulty = difficultySelect.value;
    const currentQuestion = questions[selectedDifficulty][currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("div");
        optionButton.classList.add("option");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => selectOption(index));
        optionsElement.appendChild(optionButton);
    });
}

function selectOption(index) {
    const selectedDifficulty = difficultySelect.value;
    const currentQuestion = questions[selectedDifficulty][currentQuestionIndex];
    const options = optionsElement.children;

    if (index === currentQuestion.answer) {
        score++;
        options[index].classList.add("correct");
    } else {
        options[index].classList.add("wrong");
        options[currentQuestion.answer].classList.add("correct");
    }

    clearInterval(timer);
    scoreElement.textContent = `Score: ${score}`;
    nextButton.classList.remove("hidden");
    Array.from(options).forEach((option, idx) => {
        option.removeEventListener("click", () => selectOption(idx));
    });
}

function showCorrectAnswer() {
    const selectedDifficulty = difficultySelect.value;
    const currentQuestion = questions[selectedDifficulty][currentQuestionIndex];
    const options = optionsElement.children;
    options[currentQuestion.answer].classList.add("correct");
}

function nextQuestion() {
    currentQuestionIndex++;
    const selectedDifficulty = difficultySelect.value;

    if (currentQuestionIndex < questions[selectedDifficulty].length) {
        loadQuestion();
        nextButton.classList.add("hidden");
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    finalScoreElement.textContent = `Your final score is: ${score}/${questions[difficultySelect.value].length}`;
}

function restartQuiz() {
    resultContainer.classList.add("hidden");
    categoryContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}
