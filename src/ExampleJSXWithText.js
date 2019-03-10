import React from 'react';

const ExampleJSXWithText = ({ translatedText }) => (
  <div>
    This text will not be translated:
    <br />
    <button onClick={() => alert('Clicked')}>{translatedText}</button>
  </div>
);

export default ExampleJSXWithText;
