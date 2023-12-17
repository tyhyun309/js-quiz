const questions = [
  {
    question: "What is the official currency of Hong Kong?",
    answers: [
      { text: "Hong Kong Dollar", correct: true},
      { text: "Yen", correct: false},
      { text: "Dollar", correct: false},
      { text: "Yuan", correct: false},
    ]
  },
  {
    question: "What is the name of the famous skyscraper in Hong Kong known for its panoramic views of the city?",
    answers: [
      { text: "Central Plaza", correct: false},
      { text: "Bank of China Tower", correct: false},
      { text: "International Commerce Centre (ICC)", correct: true},
      { text: "Harukas", correct: false},
    ]
  },
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "shark", correct: false},
      { text: "whale", correct: true},
      { text: "elephant", correct: false},
      { text: "cat", correct: false},
    ]
  },
  {
    question: "What is the highest mountain in Japan?",
    answers: [
      { text: "Mount Aso", correct: false},
      { text: "Mount Fuji", correct: true},
      { text: "Mount Tateyama", correct: false},
      { text: "Mount Haku", correct: false},
    ]
  },
  {
    question: "Which Japanese city is famous for its hot springs (onsen)?",
    answers: [
      { text: "Kyoto", correct: false},
      { text: "Hakone", correct: true},
      { text: "Tokyo", correct: false},
      { text: "Yufuin", correct: false},
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " +currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  } else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = 'block';
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
