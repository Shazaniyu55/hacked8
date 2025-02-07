document.addEventListener("DOMContentLoaded", async () => {
    const timerElement = document.getElementById("timer");
    const questionNumberElement = document.getElementById("question-number");
    const questionTextElement = document.getElementById("question-text");
    const answerOptionsElement = document.getElementById("answer-options");
    const questionNavigationElement = document.getElementById("question-navigation");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const subject = document.querySelector(".subject");

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let totalTime = 600; // 10 minutes in seconds

    // Fetch questions from API
    async function fetchQuestions() {
        try {
            const response = await fetch("http://localhost:3100/api/auth/FE-Exam");
            const data = await response.json();
            console.log("API Response:", data);

            if (!data.frontendExamData || !Array.isArray(data.frontendExamData)) {
                throw new Error("Invalid API response structure");
            }

            // Process API data
            questions = data.frontendExamData.flatMap((exam) =>
                exam.questions.map((q) => ({
                    question: q.questionText,
                    options: q.options || [],
                    correctAnswer: q.correctOptionId,
                    title: exam.title,
                }))
            );

            console.log("Fetched Questions:", questions);

            if (questions.length === 0) {
                throw new Error("No questions received");
            }

            renderQuestion();
            renderQuestionNavigation();
        } catch (error) {
            console.error("Error fetching questions:", error);
            alert("Failed to fetch questions. Please try again later.");
        }
    }

    // Render the current question
    function renderQuestion() {
        if (!questions[currentQuestionIndex]) return;

        const currentQuestion = questions[currentQuestionIndex];
        questionNumberElement.textContent = currentQuestionIndex + 1;
        questionTextElement.textContent = currentQuestion.question;
        subject.textContent = currentQuestion.title;

        // Clear previous options
        answerOptionsElement.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("danswer");
            optionDiv.innerHTML = `<p><strong>${String.fromCharCode(65 + index)}.</strong> ${option.text}</p>`;
            
            optionDiv.onclick = () => selectAnswer(optionDiv, option.optionId);
            answerOptionsElement.appendChild(optionDiv);
        });
    }

    // Select an answer
    function selectAnswer(selectedDiv, selectedOptionId) {
        const allOptions = document.querySelectorAll(".danswer");
        allOptions.forEach((div) => div.classList.remove("selected"));

        selectedDiv.classList.add("selected");

        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOptionId === currentQuestion.correctAnswer) {
            score++;
        }
    }

    // Render question navigation
    function renderQuestionNavigation() {
        questionNavigationElement.innerHTML = "";

        questions.forEach((_, index) => {
            const navItem = document.createElement("p");
            navItem.textContent = index + 1;
            navItem.onclick = () => {
                currentQuestionIndex = index;
                renderQuestion();
            };
            questionNavigationElement.appendChild(navItem);
        });
    }

    // Previous and Next button functionality
    prevBtn.onclick = () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    };

    nextBtn.onclick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        }
    };

    // Submit and end test
    submitBtn.onclick = () => endTest();

    function endTest() {
        const cbtDiv = document.querySelector(".cbt");
        cbtDiv.innerHTML = `
            <div class="result-container">
                <h1>Test Completed</h1>
                <p>Your score is <strong>${score}</strong> out of <strong>${questions.length}</strong></p>
                <button id="restartBtn" onclick="location.reload()">Restart</button>
            </div>
        `;
    }

    // Start the timer
    function startTimer() {
        const interval = setInterval(() => {
            const minutes = Math.floor(totalTime / 60);
            const seconds = totalTime % 60;

            timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

            if (totalTime <= 0) {
                clearInterval(interval);
                endTest();
            } else {
                totalTime--;
            }
        }, 1000);
    }

    // Initialize
    await fetchQuestions();
    startTimer();
});
