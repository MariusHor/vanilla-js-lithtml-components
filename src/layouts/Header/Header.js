import { html } from 'lit-html';
import { Component } from '@lib';
import pubSub from '@utils';

import './Header.scss';

export default class Header extends Component {
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
    const { className } = this.props;
    const { id } = this;

    return html`
      <header class=${className} data-bind=${id}>
        <h1>Vanilla JS + Lit-html Components</h1>
      </header>
    `;
  }
}
