import { addLocale, useLocale } from 'ttag';

import fr from './fr.po.json';
import de from './de.po.json';

export default function(locale) {
  if (locale !== 'en') {
    // load json file with translations
    const i18n = {
      fr,
      de
    };
    addLocale(locale, i18n[locale]);
    useLocale(locale);
  } else {
    useLocale('en');
  }
}
