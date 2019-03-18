import React from 'react';
import { t } from 'ttag';

const ExampleText = ({ text }) => (
  <div>
    <h3>{t`This is some example translated text: ${text}`}</h3>
    <br />
    <p>
      Text not wrapped with <i>t``</i> will not be translated
    </p>
  </div>
);

export default ExampleText;
