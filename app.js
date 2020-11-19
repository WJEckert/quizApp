'use strict'
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What\'s the colors of Sailor Moon\'s iconic outfit?',
      answers: [
        'Black and Red',
        'White and Green',
        'Blue and White',
        'Pink and Black'
      ],
      correctAnswer: 'Blue and White',
      image: "images/SailorMoon.png"
    },
    {
      question: 'What\'s the most popular ranked anime according to MyAnimeList?',
      answers: [
        'Gintama',
        'Attack On Titan',
        'Fullmetal Alchemist: Brotherhood',
        'Steins;Gate'
      ],
      correctAnswer: 'Fullmetal Alchemist: Brotherhood',
      image: "images/MAL.png",
    },
    {
      question: 'Who is the main character in Death Note?',
      answers: [
        'Sailor Moon',
        'Light Yagami',
        'Tuxedo Mask',
        'Yuno Gasai'
      ],
      correctAnswer: 'Light Yagami',
      image: "images/DeathNote.jpg"
    },
    {
      question: 'What was the first anime produced in color?',
      answers: [
        'Inuyasha',
        'Fairy Tail',
        'Hakujaden',
        'Black Butler'
      ],
      correctAnswer: 'Hakujaden',
      image: "images/hakujaden.jpg"
    },
    {
      question: 'What\'s the longest running anime series?',
      answers: [
        'Bleach',
        'OnePiece',
        'OyakoClub',
        'Sazae-San'
      ],
      correctAnswer: 'Sazae-San',
      image: "images/Sazae-san.jpg"
    }

  ],
  questionAnswered: false,
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
  //console.log(store.quizStarted);
  return `<div class = "normalLayout">
  <form id="quizQuestion">
  <input name="answer" type="radio" value="yes">
   <label for="yes">Yes</label>   <br>
  <input name="answer" type="radio" value="no">
   <label for="no">No</label>   <br>
  <button type="submit">Start Quiz</button>
  </form></div>`
}

function generateQuestion() {

  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer,index)=>{
    return `<input type="radio" id="answer${index}" name ="answer" value = '${answer}'>
      <label for="answer${index}"> ${answer} </label><br>`;
  });
  return `<div class = 'quizLayout'> 
            <form id = "question">
              <h2>${question.question}</h2>
                ${answers.join('')}
              <button type="submit"> Submit Answer </button>
            </form>
           <div class = 'questionInfo'> Question: ${store.questionNumber+1} of ${store.questions.length}<br>   Questions correct: ${store.score} of ${store.questions.length}
           <br>
           <img class = "questionImage" src = ${store.questions[store.questionNumber].image} alt = "Picture of question">
           </div>
          </div>`
         

}

function generateEnd() {
  let html = '';
  //console.log('This is the end')
  if ((store.score/store.questions.length)*100 > 75){
    html = `<div class = 'normalLayout'>
              <form id = "end">
                <h2>You reached the end</h2>
                <p>You got ${store.score} questions correct out of ${store.questions.length}! <br>
                You got ${(store.score/store.questions.length)*100}% right!. <br>
                <div class = 'animeWeeb'>
                You are a weeb!
                <img class = "questionImage" src = "images/TrueWeeb.jpg" alt = "You are a weeb">
                </div>
                </p>
                <button type="submit"> Retry </button>
                
              </form>
            </div>`
  } 
  else {
    html =
          `<div class = 'normalLayout'>
         
                <form id = "end">
                  <h2>You reached the end</h2>
                  <p>You got ${store.score} questions correct out of ${store.questions.length}! <br>
                  You got ${(store.score / store.questions.length) * 100}% right!.
                </p>
                  <div class = 'animeWeeb'>
                    You are not a weeb! Git good.
                    <img class = "questionImage" src = "images/NotAWeeb.png" alt = "You are not a weeb">
                  </div>
                  
                </p>
                  <button type="submit"> Retry </button>
                </form>
              </div> `
  }
  return html;
}
  

function correct(){
  return `<div class = 'normalLayout'>
  <form id = 'answer'>
    <h2>
      Correct
    </h2>
    <button type="submit"> Next Question </button>
    </form>
  </div>`
}
function incorrect(chosenAnswer){
  return `<div class = 'normalLayout'>
  <form id = 'answer'>
      <h2>
        Incorrect, you answered ${chosenAnswer} but should have answered ${store.questions[store.questionNumber].correctAnswer}
      </h2>
      <button type="submit"> Next Question </button>
    </form>
  </div>`
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderAnswerPage(chosenAnswer){
  if (chosenAnswer === store.questions[store.questionNumber].correctAnswer){
    console.log("Correct");
    store.score++;
    const correctAnswer = correct();
    $('.quiz').html(correctAnswer);
    
  }
  else {
    console.log("Incorrect")
    const incorrectAnswer = incorrect(chosenAnswer);
    $('.quiz').html(incorrectAnswer);
  }
}

function renderQuiz() {
  // render the shopping list in the DOM
  let html = '';
  console.log('`renderQuiz` ran');
  console.log(`${store.quizFinished}`);
  if (store.quizFinished === true) {
    //console.log("I am stumped")
    html = generateEnd();
    
  }
  if (store.quizStarted === false){
    html = generateStartScreen();
  }
  else if (store.quizFinished === false){
    html = generateQuestion();
    if (store.questionNumber+1 === store.questions.length){
      store.quizFinished = true;
      //console.log('Done');
    }
  }
  $('.quiz').html(html);
  // insert that HTML into the DOM
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleQuizStartSubmit(){
  $('.quiz').on('submit', '#quizQuestion',function(event){
    event.preventDefault();

    let chosenAnswer = $("input[name='answer']:checked").val();
    //console.log(chosenAnswer);
    if (chosenAnswer === 'yes'){
      store.quizStarted = true;
    }    
    renderQuiz();
  });
}

function handleAnswerRotation(){
  $('.quiz').on('submit', '#question',function(event){
    event.preventDefault();

    let chosenAnswer = $("input[name='answer']:checked").val();
    if (chosenAnswer != undefined) {
    renderAnswerPage(chosenAnswer);
    }
  });
}
function handleNextQuestion(){
  $('.quiz').on('submit', '#answer',function(event){
    //console.log('testing');
    event.preventDefault();
    store.questionNumber++;
    renderQuiz();    
  });
}


function main() {
  renderQuiz();
  handleQuizStartSubmit();
  handleAnswerRotation();
  handleNextQuestion();
}


$(main);