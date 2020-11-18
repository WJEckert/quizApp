'use strict'
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  quizFinished: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateStartScreen(){
  store.quizStarted = true;
  console.log(store.quizStarted);
  return `<form id="quizQuestion">
  <input name="readyOrnot" type="radio" value="yes">
   <label for="yes">Yes</label>   <br>
  <input name="readyOrnot" type="radio" value="no">
   <label for="no">No</label>   <br>
  <button type="submit">Start Quiz</button>
  </form>`
}

function generateQuestion() {
  return `<form id="quizQuestion">
  <input name="readyOrnot" type="radio" value="yes">
   <label for="yes">Maybe</label>   <br>
  <input name="readyOrnot" type="radio" value="no">
   <label for="no">Maybe</label>   <br>
  <button type="submit">Submit Question</button>
  </form>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  // render the shopping list in the DOM
  console.log('`renderQuiz` ran');
  if (store.quizStarted === false){
    const quizStart = generateStartScreen();
    $('.quiz').html(quizStart);
  }
  else if (store.quizFinished === false){
    const quizQuestion = generateQuestion();
    $('.quiz').html(quizQuestion);
  }
  // insert that HTML into the DOM
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleSubmit(){
  $('.quiz').submit(function(event){
    event.preventDefault();
    renderQuiz();
  })
}


function main() {
  renderQuiz();
  handleSubmit();
}


$(main);