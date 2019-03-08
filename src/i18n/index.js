import { addLocale, useLocale } from 'ttag';

import fr from './fr.po.json';
import de from './de.po.json';
import es from './es.po.json';
import ru from './ru.po.json';

export default function(locale) {
  if (locale !== 'en') {
    // load json file with translations
    const i18n = {
      fr,
      de,
      es,
      ru
    };
    addLocale(locale, i18n[locale]);
    useLocale(locale);
  } else {
    useLocale('en');
  }
}
