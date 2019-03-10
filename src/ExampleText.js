import React from 'react';
import { t } from 'ttag';

const ExampleText = ({ text }) => (
  <div>
    <h3>{t`This is some example translated text: `}</h3>
    {text}
    <br />
    <p>
      Text not wrapped with <pre>t``</pre> will not be translated
    </p>
  </div>
);

export default ExampleText;
