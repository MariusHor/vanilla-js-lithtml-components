import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';
import Button from './Button';

export default class Form extends Component {
  setup() {
    this.name = 'Form';
    this.ButtonSubmitC = new Button();
  }

  onConnected() {
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
