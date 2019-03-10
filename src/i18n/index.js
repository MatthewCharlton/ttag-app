import { addLocale, useLocale, setDedent } from 'ttag';

import fr from './fr.po.json';
import de from './de.po.json';
import ru from './ru.po.json';

export const i18nObj = {
  fr: [fr, 'French'],
  de: [de, 'German'],
  ru: [ru, 'Russian']
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
