import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';

import './Header.scss';

export default class Header extends Component {
  setup() {
    this.name = 'Header';
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
    const { className } = this.props;
    const { id } = this;

    return html`
      <header class=${className} data-bind=${id}>
        <h1>Vanilla JS + Lit-html Components</h1>
      </header>
    `;
  }
}
