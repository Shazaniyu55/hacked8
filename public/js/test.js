let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// DOM Elements
const loginSection = document.getElementById("login-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("login-btn");
const questionTitle = document.getElementById("question-title");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

// Fetch questions from API
async function fetchQuestions() {
  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const data = await response.json();
  questions = data.results.map((q) => ({
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    correctAnswer: q.correct_answer,
  }));
  showQuestion();
}

// Show question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.innerHTML = currentQuestion.question;
  optionsDiv.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => selectAnswer(option);
    optionsDiv.appendChild(button);
  });
  nextBtn.style.display = "none";
}

// Select answer
function selectAnswer(selected) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selected === currentQuestion.correctAnswer) {
    score++;
  }
  nextBtn.style.display = "block";
}

// Show next question or results
nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
};

// Show results
function showResults() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  scoreDisplay.innerText = `You scored ${score} out of ${questions.length}`;
}

// Start test
loginBtn.onclick = () => {
  const username = usernameInput.value.trim();
  if (username) {
    loginSection.style.display = "none";
    quizSection.style.display = "block";
    fetchQuestions();
  } else {
    alert("Please enter your name to start the test!");
  }
};
