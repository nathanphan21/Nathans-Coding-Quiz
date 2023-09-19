var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

//Event listener which intiates when clicking the start quiz button
//pulls the ID start screen and changes display to none
//sets display of the questions to block so it is now visible
startBtn.addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none"
    questionsEl.style.display = "block";
//Call the nextquestion function and start timer function
    nextQuestion()
    startTimer()
})

//Function to start timer 
function startTimer() {
  timerInterval = setInterval(function () {
    timerEl.textContent = time;

    //If statement if timer runs out to end the quiz
    if (time <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
    //Decreases the time by 1 second
    time--;
  }, 1000); // 1000 milliseconds = 1 second
}
//Function to stop the timer
function stopTimer() {
  clearInterval(timerId);
}

//Function to go to the next question
//Sets a variable current question to equal the questions array (which starts at 0)
function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      var currentQuestion = questions[currentQuestionIndex];
  
      //Pulls the question title ID and sets the content to be the current questions title
      document.getElementById('question-title').textContent = currentQuestion.title;
  
      //This will clear the previous answer choices by using innerHTML
      choicesEl.innerHTML = '';
  
      //Uses the create element method to create a button using choices as a parameter
      //Uses textcontent to set the buttons text as the choices text
      currentQuestion.choices.forEach(function (choices) {
        var choicesButton = document.createElement('button');
        choicesButton.textContent = choices;
  
        //This calls the function answercheck to check the answer when the button is clicked
        choicesButton.addEventListener('click', function () {
          answerCheck(choices, currentQuestion.answer);
        });
        choicesEl.appendChild(choicesButton);
      });
  
      currentQuestionIndex++;
    } else {

      endQuiz();
    }
  }


  function answerCheck(selectedAnswer, answer) {
    if (selectedAnswer === answer) {
      sfxRight.play();
    } else {
      sfxWrong.play();
      time -= 15 ;
      if (time < 0) {
        time = 0;
      }
    }
    nextQuestion();
  }
  

  function endQuiz() {
    //This hides the question element by setting display to none
    questionsEl.style.display = 'none';
  
    //Calls the endscreen section by ID and sets display to block so its visible
    var endScreen = document.getElementById('end-screen');
    endScreen.style.display = 'block';
  
    //Sets variable final score equal to the calculate score function
    //Calls final score by ID and sets the content to finalscore variable
    var finalScore = calculateScore();
    document.getElementById('final-score').textContent = finalScore;
  
    //Calculate score function which uses a for loop to count the answers
    function calculateScore() {
      var correctAnswers = 0;
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer === questions[i].answer) {
          correctAnswers++;
        }
      }
    
      //Using the extra time to give additional points to final score 
      var baseScore = correctAnswers * 5;
      var timeBonus = time;
    
      
      var finalScore = baseScore + timeBonus;
      
    
      return finalScore;
    }
  }

