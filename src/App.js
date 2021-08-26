import React, { useEffect, useState } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-solid-svg-icons";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "If your actions inspire others to dream more, learn more, do more and become more, you are a leader."
  );
  const [author, setAuthor] = useState("John Quincy Adams");
  const [randomQuote, setRandomQuote] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let myRandQuote = Math.floor(quotesArray.length * Math.random());
    setRandomQuote(myRandQuote);
    setQuote(quotesArray[myRandQuote].quote);
    setAuthor(quotesArray[myRandQuote].author);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <h1>Random Quote: {randomQuote}</h1>

          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <button id="new-quote" onClick={() => getRandomQuote()}>
            Get A Quote
          </button>
          <a
            id="tweet-quote"
            href={encodeURI(
              "http://www.twitter.com/intent/tweet?text=${quote} -${author}"
            )}
          >
            Tweet Quote
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
