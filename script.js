const questions = [
  {
    question: "How do you typically react to challenges in life?",
    answers: [
      { text: "Avoid them", points: 1 },
      { text: "Approach them cautiously", points: 2 },
      { text: "Embrace them with enthusiasm", points: 3 },
      { text: "Seek out challenges actively", points: 4 },
    ],
  },
  {
    question: "What is your attitude towards failure?",
    answers: [
      { text: "Fear it", points: 4 },
      { text: "Accept it with resignation", points: 1 },
      { text: "Learn from it and try again", points: 2 },
      { text: "See it as an opportunity for growth", points: 3 },
    ],
  },
  {
    question: "How do you handle uncertainty?",
    answers: [
      { text: "Avoid it at all costs", points: 1 },
      { text: "Tolerate it with discomfort", points: 2 },
      { text: "Embrace it with curiosity", points: 3 },
      { text: "Thrive in uncertain situations", points: 4 },
    ],
  },
  {
    question: "When faced with criticism, how do you usually react?",
    answers: [
      { text: "Become defensive", points: 1 },
      { text: "Take it personally", points: 4 },
      { text: "Reflect on it and consider improvements", points: 2 },
      { text: "Welcome constructive criticism", points: 3 },
    ],
  },
  {
    question: "How do you view setbacks in your life?",
    answers: [
      { text: "As major roadblocks", points: 1 },
      { text: "As temporary obstacles", points: 2 },
      { text: "As opportunities to adapt", points: 3 },
      { text: "As stepping stones to success", points: 4 },
    ],
  },
  {
    question: "What is your reaction when faced with change?",
    answers: [
      { text: "Fear and resistance", points: 1 },
      { text: "Acceptance with reluctance", points: 2 },
      { text: "Openness to change", points: 3 },
      { text: "Eagerness for new experiences", points: 4 },
    ],
  },
  {
    question: "How do you handle stress?",
    answers: [
      { text: "Easily overwhelmed", points: 1 },
      { text: "Struggle but manage", points: 2 },
      { text: "Manage stress well", points: 3 },
      { text: "Thrive under pressure", points: 4 },
    ],
  },
  {
    question: "What is your perspective on learning?",
    answers: [
      { text: "Avoid learning new things", points: 1 },
      { text: "Learn when necessary", points: 2 },
      { text: "Enjoy learning new skills", points: 3 },
      { text: "Continuously seek to expand knowledge", points: 4 },
    ],
  },
  {
    question: "How do you view success?",
    answers: [
      { text: "As luck or external factors", points: 1 },
      { text: "As the result of effort", points: 2 },
      { text: "As a sign of competence", points: 3 },
      { text: "As a result of talent and hard work", points: 4 },
    ],
  },
];

const resultSuggestions = [
  {
    score: 10,
    label: "Chill Explorer",
    mindset: "Fixed Mindset",
    suggestions: [
      "Embrace Challenges: Start by taking on tasks that are slightly outside your comfort zone.",
      "Learn from Setbacks: Instead of viewing failures as evidence of a lack of ability, see them as opportunities to learn and improve.",
      "Effort Matters: Shift your focus from innate talent to the effort you put into a task."
    ],
  },
  {
    score: 20,
    label: "Curious Learner",
    mindset: "Growth Mindset",
    suggestions: [
      "Embrace Challenges: See challenges as opportunities to learn and improve.",
      "Persist in Effort: Value effort as a path to mastery. Appreciate the process of learning and growing.",
      "Learn from Criticism: Embrace feedback, even if it's critical. View constructive criticism as valuable input for your growth."
    ],
  },
  {
    score: 30,
    label: "Proactive Achiever",
    mindset: "Agile Mindset",
    suggestions: [
      "Adaptability: Embrace change and uncertainty as opportunities for innovation.",
      "Iterative Learning: Emphasize a cycle of continuous learning and improvement. Break down complex tasks into smaller, manageable steps.",
      "Collaboration: Foster a collaborative approach, valuing diverse perspectives and skills."
    ],
  },
  {
    score: Infinity,
    label: "Fearless Innovator",
    mindset: "Mastery Mindset",
    suggestions: [
      "Deliberate Practice: Engage in focused, intentional practice to continually refine and improve your skills.",
      "Lifelong Learning: Cultivate a mindset of continuous learning and curiosity. Seek out new knowledge.",
      "Feedback Integration: Actively seek feedback from mentors, peers, or experts. Embrace constructive criticism as a valuable tool for growth."
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const finalScoreElement = document.getElementById("final-score");

let currentQuestionIndex = 0;
let totalScore = 0;
let timer;
const timePerQuestion = 15;
const totalPossiblePoints = 40;

function startQuiz() {
  currentQuestionIndex = 0;
  totalScore = 0;
  nextButton.innerHTML = "Next";
  finalScoreElement.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.points = answer.points;
    button.addEventListener("click", () => selectAnswer(button, index));
    answerButtons.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  let timeLeft = timePerQuestion;
  updateTimer(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft < 0) {
      // Time's up, go to the next question without selecting any answer
      handleNextButton();
    }
  }, 1000);
}

function updateTimer(timeLeft) {
  timerElement.textContent = `Time: ${timeLeft}s`;
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, selectedIndex) {
  clearInterval(timer);

  const buttons = answerButtons.getElementsByTagName("button");

  Array.from(buttons).forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  const points = questions[currentQuestionIndex].answers[selectedIndex].points || 0;
  totalScore += points;

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  let result = "";
  let percentage = (totalScore / totalPossiblePoints) * 100;

  resultSuggestions.forEach((suggestion) => {
    if (percentage <= suggestion.score) {
      result = suggestion.label;
      displayResult(result, suggestion);
      return;
    }
  });
}

function displayResult(result, suggestion) {
  questionElement.innerHTML = `Your Personality Result: ${result}`;
  finalScoreElement.innerHTML = `Final Score: ${totalScore} out of ${totalPossiblePoints}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  timerElement.style.display = "none";

  // Display mindset and suggestions
  const mindsetElement = document.createElement("div");
  mindsetElement.classList.add("mindset");
  mindsetElement.innerHTML = `Mindset: ${suggestion.mindset}`;
  finalScoreElement.appendChild(mindsetElement);

  const suggestionsElement = document.createElement("ul");
  suggestionsElement.classList.add("suggestions");
  suggestion.suggestions.forEach((s) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = s;
    suggestionsElement.appendChild(listItem);
  });
  finalScoreElement.appendChild(suggestionsElement);
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
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
