import React, { useEffect, useState } from 'react';
import wordsToNumbers from 'words-to-numbers';
import logo from './logo.svg';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCard from './components/NewsCards/NewsCard';
import { classes } from 'istanbul-lib-coverage';
import useStyles from './styles.js'


const App = () =>  {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const logoSrc = 'https://alan.app/voice/images/previews/preview.jpg';
  const alanKey = 'af3fda033821aefd44baa860b76216b62e956eca572e1d8b807a3e2338fdd0dc/stage';
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: apiKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open') {
          const parsedNumber = Number(command.split(' ')[1]);
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
    <div className={classes.logoContainer}>
      <img  src={logoSrc} className={classes.alanLogo} alt="alan logo">   
        
      </img>
    </div>
    <NewsCard articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
