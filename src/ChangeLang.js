import React from 'react';
import i18n from './i18n';

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
    i18n(lang);
    return (
      <select onChange={this.handleChange} value={lang}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="ru">Russian</option>
      </select>
    );
  }
}

export default ChangeLang;
