document.addEventListener('DOMContentLoaded', function () {

    // Array of questions with text, options, and correct answer

    const questions = [
        {
            text: "Who is the author of 'Harry Potter'?",
            options: ["J.K Rowling", "J.R.R. Tolkien", "George R.R. Martin", "C.S. Lewis"],
            correctAnswer: "J.K Rowling"
        },
        {
            text: "What is the capital of France?",
            options: ["Paris", "Berlin", "Madrid", "Rome"],
            correctAnswer: "Paris"
        },
        {
            text: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        }
    ];

    let currentQuestionIndex = 0;
    let timeLeft = 10;
    let timer;

    function checkAnswer(answer) {
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            alert("Correct!");
        } else {
            alert("Wrong Answer!");
        }
        clearInterval(timer);
        document.getElementById('nextQuestion').style.display = 'block';
    }

    function useLifeline(lifeline) {
        alert(`You used ${lifeline}!`);
    }

    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {

            // Set the new question text and options

            document.getElementById('question').textContent = questions[currentQuestionIndex].text;
            renderOptions();

            // Hide the 'Next Question' button and restart the timer

            document.getElementById('nextQuestion').style.display = 'none';
            startTimer();
        } else {
            alert("Quiz Finished!");
            document.getElementById('question').textContent = "Quiz Finished!";
            document.getElementById('options').innerHTML = '';

            // Clear options

            document.getElementById('nextQuestion').style.display = 'none';
        }
    }

    function startTimer() {
        timeLeft = 10;
        document.getElementById('timer').textContent = timeLeft;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up!");
                document.getElementById('nextQuestion').style.display = 'block';
            }
        }, 1000);
    }

    function renderOptions() {
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        // Clear previous options

        questions[currentQuestionIndex].options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    // Add event listener to the 'Next Question' button

    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);

    // Initial call to set the first question and start the timer

    document.getElementById('question').textContent = questions[currentQuestionIndex].text;
    renderOptions();
    startTimer();
});
