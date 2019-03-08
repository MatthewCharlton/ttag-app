import React from 'react';
import { t } from 'ttag';

const ExampleText = ({ text }) => (
  <div>{t`This is some example text: ${text}`}</div>
);

export default ExampleText;
