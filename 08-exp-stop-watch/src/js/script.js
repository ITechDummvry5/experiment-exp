// ===============================
// QUIZ DATA (Questions & Answers)
// ===============================
const questions = [
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Kyoto", correct: false }
    ]
  },
  {
    question: "Which element has the chemical symbol O?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Osmium", correct: false },
      { text: "Zinc", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "Which is the fastest land animal?",
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Horse", correct: false },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: false }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which ocean is the largest?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "What is H2O commonly known as?",
    answers: [
      { text: "Salt", correct: false },
      { text: "Oxygen", correct: false },
      { text: "Water", correct: true },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Who was the first man to walk on the Moon?",
    answers: [
      { text: "Yuri Gagarin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Buzz Aldrin", correct: false },
      { text: "Michael Collins", correct: false }
    ]
  },
  {
    question: "Which is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false }
    ]
  }
];

// ===============================
// DOM ELEMENTS
// ===============================
const questionElement = document.getElementById("question");     // Question text
const answerButtons = document.getElementById("answer-buttons"); // Answer choices container
const nextButton = document.getElementById("next-btn");          // Next button

// ===============================
// QUIZ STATE VARIABLES
// ===============================
let currentQuestionIndex = 0; // Track which question we’re on
let score = 0;                // Track user score

// ===============================
// START QUIZ FUNCTION
// ===============================
function startQuiz() {
  currentQuestionIndex = 0;          // Start from first question
  score = 0;                         // Reset score
  nextButton.innerHTML = "Next";     // Set button text to "Next"
  showQuestion();                    // Load first question
}

// ===============================
// SHOW QUESTION FUNCTION
// ===============================
function showQuestion() {
  resetState(); // Clear previous answers

  // Get current question object
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  // Show question text with number
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Create buttons for each answer
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); // New button
    button.innerHTML = answer.text;                  // Answer text
    button.classList.add("btn");                     // Add CSS class
    answerButtons.appendChild(button);               // Add button to container

    // Mark correct answer with dataset
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // Add click event to check answer
    button.addEventListener("click", selectAnswer);
  });
}

// ===============================
// RESET STATE FUNCTION
// ===============================
function resetState() {
  nextButton.style.display = "none"; // Hide Next button
  // Remove old answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// ===============================
// SELECT ANSWER FUNCTION
// ===============================
function selectAnswer(e) {
  const selectedBtn = e.target; // The clicked button
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check correctness

  // If correct, make it green and add score
  if (isCorrect) {
    selectedBtn.style.background = "green";
    score++;
  } else {
    selectedBtn.style.background = "red"; // Wrong → red
  }

  // Highlight correct answer in green
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.background = "green";
    }
    button.disabled = true; // Disable all buttons after selection
  });

  // Show Next button
  nextButton.style.display = "block";
}

// ===============================
// SHOW SCORE FUNCTION
// ===============================
function showScore() {
  resetState(); // Clear old answers
  // Display final score
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
  // Change button to Play Again
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// ===============================
// HANDLE NEXT BUTTON FUNCTION
// ===============================
function handleNextButton() {
  currentQuestionIndex++; // Go to next question
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Show next
  } else {
    showScore(); // If finished, show score
  }
}

// ===============================
// NEXT BUTTON CLICK EVENT
// ===============================
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton(); // Next question
  } else {
    startQuiz(); // Restart quiz
  }
});

// ===============================
// AUTO START QUIZ ON LOAD
// ===============================
startQuiz();
