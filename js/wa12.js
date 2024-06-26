const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';


const newQuote = document.querySelector('#js-new-quote');
newQuote.addEventListener('click', getTrivia);

const answerBtn = document.querySelector('#js-tweet').addEventListener('click', displayAnswer);

const shareBtn = document.querySelector('#js-share');
shareBtn.addEventListener('click', shareOnTwitter);


let answerTxt = document.querySelector('#js-answer-text');
let questionTxt = document.querySelector('#js-quote-text');
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
        answerTxt.textContent = '';
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

function shareOnTwitter() {
    const question = questionTxt.textContent;
    const answer = answerTxt.textContent;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(question + ' - ' + answer)}`;
    window.open(twitterURL, '_blank');
}


getTrivia();