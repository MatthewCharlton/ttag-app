import React from 'react';
import { jt } from 'ttag';

const ExampleJSXWithText = ({ translatedText }) => {
  const button = (
    <button key="translatedText" onClick={() => alert('Clicked')}>
      {translatedText}
    </button>
  );
  return (
    <div>
      This text will be translated:
      <br />
      {jt`Click this button ${button}`}
    </div>
  );
};

export default ExampleJSXWithText;
