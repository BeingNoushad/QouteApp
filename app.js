const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitterbtn')
const newQuoteBtn = document.getElementById('newQuote')
const loader = document.getElementById('loader1')


// show loading 
function loading(){
     loader.hidden=false;
     quoteContainer.hidden=true;
}
//   hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}



// using api 
// fomismatic api 
// get quote from api 
async function getQuote(){
    loading();
    // proxy server will acts us a cross origin
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/' 
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        // If Author is blank , add 'unknown'
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes 
        if(data.quoteText.length > 50){
           quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // stope loader, show quote]
        complete()

        console.log(data)
    }catch(error){
        getQuote()
        console.log('whoops, no qoutes', error)
    }

}

/// tweet quote 
function tweetQuote(){
      const quote = quoteText.innerText;
      const author =  authorText.innerText;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      window.open(tweetUrl,'_blank')
}

// event listeners 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuote()

// loading();