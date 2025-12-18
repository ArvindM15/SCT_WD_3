const quizData = [
  {
    type: "single",
    question: "Who is known as the God of Cricket?",
    options: ["Virat Kohli", "Sachin Tendulkar", "MS Dhoni", "Brian Lara"],
    answer: "Sachin Tendulkar"
  },
  {
    type: "multi",
    question: "Which are ICC tournaments?",
    options: ["World Cup", "IPL", "Champions Trophy", "Big Bash"],
    answer: ["World Cup", "Champions Trophy"]
  },
  {
    type: "fill",
    question: "How many players are there in one cricket team?",
    answer: "11"
  }
];

let current = 0;
let score = 0;

const container = document.getElementById("question-container");
const nextBtn = document.getElementById("nextBtn");

loadQuestion();

function loadQuestion() {
  container.innerHTML = "";
  const q = quizData[current];

  container.innerHTML = `<div class="question">${q.question}</div>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  if (q.type === "single") {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label class="option">
          <input type="radio" name="answer" value="${opt}">
          ${opt}
        </label>
      `;
    });
  }

  if (q.type === "multi") {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label class="option">
          <input type="checkbox" value="${opt}">
          ${opt}
        </label>
      `;
    });
  }

  if (q.type === "fill") {
    optionsDiv.innerHTML += `<input type="text" id="fillAnswer" placeholder="Type your answer">`;
  }

  container.appendChild(optionsDiv);
}

nextBtn.addEventListener("click", () => {
  checkAnswer();
  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function checkAnswer() {
  const q = quizData[current];

  if (q.type === "single") {
    const selected = document.querySelector("input[name='answer']:checked");
    if (selected && selected.value === q.answer) score++;
  }

  if (q.type === "multi") {
    const selected = [...document.querySelectorAll("input[type='checkbox']:checked")]
      .map(el => el.value)
      .sort();
    if (JSON.stringify(selected) === JSON.stringify(q.answer.sort())) score++;
  }

  if (q.type === "fill") {
    const input = document.getElementById("fillAnswer");
    if (input.value.trim() === q.answer) score++;
  }
}

function showScore() {
  container.innerHTML = `
    <div class="score">
      Your Score: ${score} / ${quizData.length}
    </div>
  `;
  nextBtn.style.display = "none";
}
