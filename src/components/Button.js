import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';

export default class Button extends Component {
  onConnected() {
    pubSub.publish('connected', {
      name: this.constructor.name,
      id: this.id,
    });
  }

  onDisconnected() {
    pubSub.publish('disconnected', {
      name: this.constructor.name,
      id: this.id,
    });
  }

  render() {
    const { type = 'button', className = '', text, action } = this.props;

    return html`
      <button type=${type} class=${`button ${className}`} @click=${action} data-bind=${this.id}>
        ${text}
      </button>
    `;
  }
}