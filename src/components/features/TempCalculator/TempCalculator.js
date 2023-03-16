import { html } from 'lit-html';
import { Component } from '@lib';
import { Feature, TemperatureInput } from '@components';
import { pubSub } from '@utils';
import { toCelsius, toFahrenheit, tryConvert } from './helpers';

import './TempCalculator.scss';

export default class TempCalculator extends Component {
  setup() {
    this.name = 'TempCalculator';
  }

  onConnected() {
    this.state = {
      temperature: '',
      scale: 'c',
    };

    pubSub.publish('connected', {
      name: this.name,
      id: this.id,
    });
  }

  onDisconnected() {
    pubSub.publish('disconnected', {
      name: this.name,
      id: this.id,
    });
  }

  handleCelsiusChange = temperature => {
    this.setState({ scale: 'c', temperature });
  };

  handleFahrenheitChange = temperature => {
    this.setState({ scale: 'f', temperature });
  };

  template = () => {
    const { handleCelsiusChange, handleFahrenheitChange } = this;
    const { scale, temperature } = this.state;

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    const result =
      parseFloat(celsius) >= 100
        ? html`<h4>The water would boil.</h4>`
        : html`<h4>The water would not boil.</h4>`;

    return html`
      ${TemperatureInput({
        scale: 'c',
        temperature: celsius,
        onTemperatureChange: handleCelsiusChange,
      })}
      ${TemperatureInput({
        scale: 'f',
        temperature: fahrenheit,
        onTemperatureChange: handleFahrenheitChange,
      })}
      ${!celsius.length ? html`<h4>Start by entering a temperature.</h4>` : result}
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Temperature calculator',
        className: 'feature--temp-calculator',
        template,
        id,
      })}
    `;
  }
}
