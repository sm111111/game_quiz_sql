const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

let yourAnswer = [];
let score = 0;
let currentQuiz = 0;



fetch('question_data.json')
    .then(response => response.json())
    .then(data => {
        yourAnswer = data;
        loadQuiz();
    })
    .catch(error => console.error('error fetching yourAnswer data:', error));


function loadQuiz() {
    const currentQuizData = yourAnswer[currentQuiz];
    quizContainer.innerHTML = `
    <table class="questions" >
    <tr>
        <td colspan="2" class="question">${currentQuiz + 1}.${currentQuizData.question}</td>
    </tr>
    <tr>
        <td><input type="radio" name="answer" value="a"></td>
        <td class="answer">${currentQuizData.a}</td>
    </tr>
    <tr>
        <td><input type="radio" name="answer" value="b" class="input"></td>
        <td class="answer">${currentQuizData.b}</td>
    </tr>
    <tr>
        <td><input type="radio" name="answer" value="c"></td>
        <td class="answer">${currentQuizData.c}</td>
    </tr>
    <tr>
        <td><input type="radio" name="answer" value="d"></td>
        <td class="answer">${currentQuizData.d}</td>
    </tr>
</table>

    `;

}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    for (const answer of answers) {
        if (answer.checked) {
            return answer.value;
        }
    }
    return null;

}


submitButton.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === yourAnswer[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;

        if (currentQuiz < yourAnswer.length) {
            loadQuiz();
        } else {
            resultContainer.innerHTML = `<h2>You scored ${score} out of ${yourAnswer.length}</h2>`; // Use yourAnswer.length
            quizContainer.style.display = "none";
            submitButton.style.display = "none";
        } 
    } else {
        alert("Please select an answer!"); // Moved this to the correct place
    }
});

