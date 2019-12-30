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

function submitAnswer() {
  $('.container').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.feedback').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[probNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
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

        <input type = "radio" name="choices" id="choice${i+1}" value= "${problem.choices[i]}" tabindex ="${i+1}"> 
        <label for="choice${i+1}"> ${problem.choices[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
  
}

function renderAProb() {
    let question = STORE.problems[STORE.probNumber];
    updateProblem();
    updateScore();
    const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        
        <fieldset>
          <div class="row question">
            <div class="col-12">
              <legend> ${question.problem}</legend>
            </div>
          </div>
  
          <div class="row options">
            <div class="col-12">
              <div class="js-options"> </div>
          </div>
        </div>
      
  
        <div class="row">
          <div class="col-12">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);

  $("main").html(questionHtml);
updateOptions();
$("#next-question").hide();
}

function correctAnswer() {
  $('.feedback').html(
    `<h3>Correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

function wrongAnswer() {
  $('.feedback').html(
    `<h3>Incorrect</h3>
    <p class="sizeMe">The answer is:</p>
    <p class="sizeMe">${STORE[probNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

  startQuiz()