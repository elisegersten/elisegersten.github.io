const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'


const newQuote = document.querySelecter('#js-new-quote');
newQuote.addEventListener('click', getTrivia);

const answerBtn = document.querySelector('#js-tweet').addEventListener('click', displayAnswer);

let answerTxt = document.querySelector('#js-answer-text');
let answer = '';

async function getTrivia() {
    // alert("TEST!"):
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error (response.statusText)
        }
        const json = await response.json();
        //console.log(json)
        displayTrivia(json['question']);
        answer = json['answer'];
    }
    catch(err) {
        console. log(err)
        alert('Falled to fetch new quote');
    }
}
function displayTrivia(quote)  {
    const triviaText = document.querySelector ('#js-quote-text');
    triviaText.textContent = quote;
}


function displayAnswer() {
    answerTxt.textContent = answer;
}


getTrivia();