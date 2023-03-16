import { html } from 'lit-html';
import { Component } from '@lib';
import { Feature } from '@components';
import { hasConnected, hasDisconnected } from '@utils';

export default class Login extends Component {
  setup() {
    this.name = 'Login';
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });

    this.state = { isLoggedIn: false };
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  template = () => {
    const { handleLoginClick, handleLogoutClick } = this;
    const { isLoggedIn } = this.state;

    const greeting = isLoggedIn ? html`<h1>Welcome back!</h1>` : html`<h1>Please sign in.</h1>`;
    const button = isLoggedIn
      ? html` <button class="button" @click=${handleLogoutClick}>Logout</button>`
      : html` <button class="button" @click=${handleLoginClick}>Login</button>`;

    return html` ${greeting} ${button} `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Login control',
        className: 'feature--login',
        template,
        id,
      })}
    `;
  }
}
