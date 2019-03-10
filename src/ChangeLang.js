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

  renderLanguageSelect = () => {
    const selectElements = [
      <option key="en" value="en">
        English
      </option>
    ];
    Object.keys(i18nObj).forEach(lang => {
      selectElements.push(
        <option key={lang} value={lang}>
          {i18nObj[lang][1]}
        </option>
      );
    });
    return selectElements;
  };

  render() {
    const { lang } = this.state;

    i18n(lang);

    return (
      <select onChange={this.handleChange} value={lang}>
        {this.renderLanguageSelect()}
      </select>
    );
  }
}

export default ChangeLang;
