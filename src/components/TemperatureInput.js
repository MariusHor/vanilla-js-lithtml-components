import { html } from 'lit-html';

const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
  };

  return html`
    <fieldset>
      <legend>Enter temperature in ${scaleNames[scale]}:</legend>
      <input value="${temperature}" @input="${e => onTemperatureChange(e.target.value)}" />
    </fieldset>
  `;
};

export default TemperatureInput;
