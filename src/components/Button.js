import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';

export default class Button extends Component {
  setup() {
    this.name = 'Button';
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
    const { type = 'button', className = '', text, action } = this.props;

    return html`
      <button type=${type} class=${`button ${className}`} @click=${action} data-bind=${this.id}>
        ${text}
      </button>
    `;
  }
}
