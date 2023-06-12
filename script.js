// Survey questions
const questions = [
  "How satisfied are you with our products? (Rating type, 1-5)",
  "How fair are the prices compared to similar retailers? (Rating type, 1-5)",
  "How satisfied are you with the value for money of your purchase? (Rating Type, 1-5)",
  "On a scale of 1-10, how likely are you to recommend us to your friends and family? (Rating Type, 1-10)",
  "What could we do to improve our service? (Text Type)"
];

// Initialize variables
let currentQuestion = 0;
let answers = [];

// Get DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const surveyScreen = document.getElementById("survey-screen");
const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const ratingContainer = document.getElementById("rating-container");
const ratingInput = document.getElementById("rating-input");
const textContainer = document.getElementById("text-container");
const textInput = document.getElementById("text-input");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const skipButton = document.getElementById("skip-button");
const confirmationDialog = document.getElementById("confirmation-dialog");
const confirmButton = document.getElementById("confirm-button");
const cancelButton = document.getElementById("cancel-button");
const thankyouScreen = document.getElementById("thankyou-screen");

// Display the current question and update UI
function displayQuestion() {
  const question = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  questionElement.textContent = question;

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Finish";
  } else {
    nextButton.textContent = "Next";
  }

  if (answers[currentQuestion]) {
    if (typeof answers[currentQuestion] === "number") {
      ratingInput.value = answers[currentQuestion];
    } else {
      textInput.value = answers[currentQuestion];
    }
  } else {
    ratingInput.value = "";
    textInput.value = "";
  }

  updateUI();
}

// Update UI based on question type
function updateUI() {
  if (currentQuestion === 4) {
    ratingContainer.classList.add("hidden");
    textContainer.classList.remove("hidden");
    skipButton.disabled = true;
  } else {
    ratingContainer.classList.remove("hidden");
    textContainer.classList.add("hidden");
    skipButton.disabled = false;
  }

  prevButton.disabled = currentQuestion === 0;
}

// Save the answer in the answers array
function saveAnswer() {
  if (currentQuestion === 4) {
    answers[currentQuestion] = textInput.value;
  } else {
    answers[currentQuestion] = parseInt(ratingInput.value);
  }
}

// Go to the next question
function nextQuestion() {
  if (currentQuestion === questions.length - 1) {
    confirmationDialog.classList.remove("hidden");
  } else {
    currentQuestion++;
    displayQuestion();
  }
}

// Go to the previous question
function previousQuestion() {
  currentQuestion--;
  displayQuestion();
}

// Skip the current question
function skipQuestion() {
  answers[currentQuestion] = null;
  nextQuestion();
}

// Submit the survey
function submitSurvey() {
  // Save the completed flag in the database/local storage
  // Display the thank you screen
  // Reset the survey after 5 seconds
  confirmationDialog.classList.add("hidden");
  surveyScreen.classList.add("hidden");
  thankyouScreen.classList.remove("hidden");
  setTimeout(() => {
    currentQuestion = 0;
    answers = [];
    thankyouScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
  }, 5000);
}

// Attach event listeners
document.getElementById("start-button").addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  surveyScreen.classList.remove("hidden");
  displayQuestion();
});

nextButton.addEventListener("click", () => {
  saveAnswer();
  nextQuestion();
});

prevButton.addEventListener("click", previousQuestion);

skipButton.addEventListener("click", skipQuestion);

confirmButton.addEventListener("click", submitSurvey);

cancelButton.addEventListener("click", () => {
  confirmationDialog.classList.add("hidden");
});

// Initialize the survey
displayQuestion();

