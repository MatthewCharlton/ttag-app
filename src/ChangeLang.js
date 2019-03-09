import React from 'react';
import i18n, { i18nObj } from './i18n';

class ChangeLang extends React.Component {
  state = {
    lang: 'en'
  };

  handleChange = e => {
    const lang = e.target.value;
    this.setState(() => {
      this.props.trigger();
      return { lang };
    });
  };

  render() {
    const { lang } = this.state;

    // Object.keys(i18nObj).map(lang => console.log(lang));

    i18n(lang);
    return (
      <select onChange={this.handleChange} value={lang}>
        {Object.keys(i18nObj).map((lang, i) => {
          if (i === 0)
            return (
              <option key="en" value="en">
                English
              </option>
            );
          return (
            <option key={lang} value={lang}>
              {i18nObj[lang][1]}
            </option>
          );
        })}
      </select>
    );
  }
}

export default ChangeLang;
