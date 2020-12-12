const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

const getQuoteAsync = async () => {
  showLoading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const {quoteAuthor, quoteText: quoteTextApi} = await response.json();

    
    if (quoteTextApi.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    
    authorText.innerText = quoteAuthor === '' ? 'Unknown' : quoteAuthor;
    quoteText.innerText = quoteTextApi;
    complete();
  } catch (error) {
    getQuoteAsync();
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} 
    - ${authorText.innerText}`;

  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuoteAsync);
twitterBtn.addEventListener('click', tweetQuote);


getQuoteAsync();
showLoading();