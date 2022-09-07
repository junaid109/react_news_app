import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';

const App = () =>  {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  const alanKey = 'af3fda033821aefd44baa860b76216b62e956eca572e1d8b807a3e2338fdd0dc/stage';

  useEffect(() => {
    alanBtn({
      key: apiKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React News App
        </p>
   
      </header>
    </div>
  );
}

export default App;
