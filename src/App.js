import React, { Component } from 'react';
import { t } from 'ttag';

import ChangeLang from './ChangeLang';
import ExampleText from './ExampleText';
import MainArticle from './MainArticle';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChangeLang trigger={() => this.forceUpdate()} />
        <MainArticle
          callToAction={t`Ohai world`}
          backgroundImgUrl="https://www.qantas.com/images/qantas/merchandising/loyalty/singapore-skyline-marina-night/jpg/homepagepromotion.mobile.jpg"
        />
        <header className="App-header">
          <ExampleText text={t`Blah blah yo`} />
          {t`Learn React`}
        </header>
      </div>
    );
  }
}

export default App;
