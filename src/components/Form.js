import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';
import Button from './Button';

export default class Form extends Component {
  setup() {
    this.name = 'Form';
    this.ButtonSubmitC = new Button();
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
  }

  render() {
    const { className, handleSubmit, handleChange, value } = this.props;
    const { ButtonSubmitC } = this;

    return html`
      <form class=${className} @submit=${handleSubmit} data-bind=${this.id}>
        <input class=${`${className}__input`} @input=${handleChange} type="text" value="${value}" />
        ${ButtonSubmitC.update({
          type: 'submit',
          class: 'button form__submit',
          text: 'Submit',
        })}
      </form>
    `;
  }
}
