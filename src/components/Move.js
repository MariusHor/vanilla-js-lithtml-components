import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';

export default class Move extends Component {
  setup() {
    this.name = 'Move';
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
