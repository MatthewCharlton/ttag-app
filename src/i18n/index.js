import { addLocale, useLocale, setDedent } from 'ttag';

import fr from './fr.po.json';
import de from './de.po.json';
import es from './es.po.json';
import ru from './ru.po.json';
import it from './it.po.json';

export const i18nObj = {
  fr: [fr, 'French'],
  de: [de, 'German'],
  es: [es, 'Spanish'],
  ru: [ru, 'Russian'],
  it: [it, 'Italian']
};

export default function(locale) {
  setDedent(false);
  if (locale !== 'en') {
    // load json file with translations

    addLocale(locale, i18nObj[locale][0]);
    useLocale(locale);
  } else {
    useLocale('en');
  }
}
