const STORE = {
  problems: [
    {
      problem: '144/3',
        choices: [
            'a. 46',
            'b. 48',
            'c. 50',
            'd. 52'
        ],
        correctAnswer: 'b. 48',
    },
    {
        problem: '9*46',
        choices: [
            'a. 500',
            'b. 502',
            'c. 504',
            'd. 506'
        ],
        correctAnswer: 'c. 504',
    },
    {
        problem: '87*2',
        choices: [
            'a. 171',
            'b. 172',
            'c. 173',
            'd. 174'
        ],
        correctAnswer: 'd. 174',
    },
    {
        problem: '225/25',
        choices: [
            'a. 10',
            'b. 9',
            'c. 8',
            'd. 7'
        ],
        correctAnswer: 'b. 9',
    },
    {
        problem: '84/7',
        choices: [
            'a. 12',
            'b. 14',
            'c. 16',
            'd. 18'
        ],
        correctAnswer: 'a. 12',
    }
  ],
  probNumber: 0,
  score:0
}


function startQuiz() {
    $('#start').on('click', function(event){
        renderAProb()
    }
    );
}


function updateProblem() {
    const html = $(`<ul>
        <li id="js-answered">Questions Number: ${STORE.probNumber + 1}/${STORE.problems.length}</li>
      </ul>`);
    $(".probNumber").html(html);
}

function updateScore() {
  const html = $(`<ul>
    <li id="js-score">Score: ${STORE.score}/${STORE.problems.length}</li>
    </ul>`
  );
  $(".score").html(html);
}

function updateOptions()
{
  let problem = STORE.problems[STORE.probNumber];
  for(let i=0; i<problem.choices.length; i++)
  {
    $('.js-options').append(`

        <input type = "radio" name="choices" id="choice${i+1}" value= "${problem.choices[i]}" tabindex ="${i+1}" required> 
        <label for="choice${i+1}"> ${problem.choices[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
  
}

function renderAProb() {
    let problem = STORE.problems[STORE.probNumber];
    updateProblem();
    updateScore();
    const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        
        <fieldset>
          <div class="row question">
            <div class="col-12">
              <legend> ${problem.problem}</legend>
            </div>
          </div>
  
          <div class="row options" >
            <div class="col-12">
              <div class="js-options" > </div>
          </div>
        </div>
      
  
        <div class="row">
          <div class="col-12">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);

  $(".startbox").html(questionHtml);
updateOptions();
$("#next-question").hide();
}


function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <div>
          <div class="row">
            <div class="col-12">
              <h2>Your Score is: ${STORE.score}/${STORE.problems.length}</h2>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Try Again? </button>
            </div>
          </div>
        </div>
    </form>
    </div>`);
    STORE.nextProblem = 0;
    STORE.score = 0;
  $("fieldset").html(resultHtml);
}

function handleQuestions() {
  $('body').on('click','.nextButton', (event) => {
    STORE.probNumber = STORE.probNumber + 1;
    STORE.probNumber === STORE.problems.length?displayResults() : renderAProb();
    $('#answer').hide();
    $('.feedback').hide();
    $('#answer').show();
  });
}

function correctAnswer() {
  $('.feedback').html(
    `<h3>Correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  STORE.score = STORE.score + 1;
}

function wrongAnswer() {
  let currentProb = STORE.problems[STORE.probNumber];
  $('.feedback').html(
    `<h3>Incorrect</h3>
    <p class="sizeMe">The answer is:</p>
    <p class="sizeMe">${currentProb.correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}


function submitAnswer() {
  $('.container').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE.problems[STORE.probNumber].correctAnswer;
    if (!selected) {
      alert('Please choose and option');
      return;
    }
    if (answer === correct) {
      correctAnswer();
      updateScore();
    } 
    else {
      wrongAnswer();
    }
    $('.feedback').show(); 
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
    } 
  );
}

function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    location.reload();
  });
}


function makeQuiz() {
  startQuiz()
  submitAnswer()
  handleQuestions()
  restartQuiz()
}

$(makeQuiz)