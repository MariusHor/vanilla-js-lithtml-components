import { html } from 'lit-html';
import { Component } from '@lib';
import { Feature } from '@components';
import { pubSub } from '@utils';

export default class Login extends Component {
  onConnected() {
    this.state = { isLoggedIn: false };

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
