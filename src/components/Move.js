import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';

export default class Move extends Component {
  setup() {
    this.name = 'Move';
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
    const { id } = this;
    const { step, action } = this.props;

    const description = step ? `Go to move #${step}` : 'Go to game start';

    return html`
      <li data-bind=${id}>
        <button @click=${action}>${description}</button>
      </li>
    `;
  }
}
