// const cAns= {
//     q1: "A",q2: "B",q3: "C",q4: "C"
// }

let questionData;
async function loadFunction(){

document.getElementById('loading').style.display = 'block';
document.getElementById('sub').style.display = 'none';

await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
.then(response => response.json())
.then(data =>{
    questionData = data.results
})

document.getElementById('loading').style.display = 'none';
document.getElementById('sub').style.display = 'block';

const quizeContainer = document.getElementById('quiz-container')




questionData.forEach((q, index) => {

    const options = [...q.incorrect_answers, q.correct_answer]
    shuffle(options)
    
    
    const quizDiv = document.createElement('div')
    quizDiv.id = 'question'
    quizDiv.innerHTML = `<h4>${index + 1} : ${decodeHTML(q.question)}</h4>
    <ul>
        ${options.map(opt => `<li> 
                                  <label>
                                      <input type="radio" name="question${index}" value="${decodeHTML(opt)}">
                                        ${decodeHTML(opt)}
                                  </label>
                              </li>
        `).join(' ')}
    </ul>
    <br>
    `;

    const referenceEle = document.getElementById('sub')
    quizeContainer.insertBefore(quizDiv, referenceEle )
    // quizeContainer.appendChild(quizDiv)
});
}


document.getElementById('sub').addEventListener('click', () => {
  let score = 0;

  questionData.forEach((q, index) => {
    const selected = document.querySelector(`input[name = "question${index}"]:checked`)
    if(selected){
      if(selected.value === decodeHTML(q.correct_answer))
        score++
    }
  })

  alert(`You scored ${score} out of ${questionData.length}!`);
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

loadFunction();

// const form =  document.querySelector('form')

// form.addEventListener('submit', (event)=>{
//     event.preventDefault()

// let result = 0;

    
   
    
//     const data = new FormData(form)
//     // console.log(Array.from(data.keys()))
//     // console.log(Array.from(data.values()))
    
//     // console.log(Array.from(data.entries()))
    
//     let i=1
    

// for([a, b] of Array.from(data.entries())){
        
//         // console.log(cAns[`q${i}`])
        
//         if(b == cAns[`q${i}`]){
//             result++
//         }
//         i++  
//     }    
//     const resultElement = document.getElementById('result');
//     resultElement.textContent = `You scored ${result} out of 5!`;
// })





// document.getElementById('submit-btn').addEventListener('click', function () {
//     const answers = {
//       q1: 'C',
//       q2: 'B',
//       q3: 'B',
//       q4: 'B',
//       q5: 'D'
//     };
  
//     let score = 0;
  
//     // Loop through the answers and check user input
//     for (const [question, correctAnswer] of Object.entries(answers)) {
//       const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
//       if (userAnswer && userAnswer.value === correctAnswer) {
//         score++;
//       }
//     }
  
//     // Display the result
//     const resultElement = document.getElementById('result');
//     resultElement.textContent = `You scored ${score} out of 5!`;
//   });
  
