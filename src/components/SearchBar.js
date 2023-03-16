import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';

export default class SearchBar extends Component {
  setup() {
    this.name = 'SearchBar';
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
    const { inputValue, isChecked, onTextInputChange, onCheckboxChange } = this.props;
    const { id } = this;

    return html`
      <form data-bind=${id}>
        <input type="text" placeholder="Search..." value=${inputValue} @input=${onTextInputChange} />
        <p>
          <input type="checkbox" .checked=${isChecked} @input=${onCheckboxChange} />
          Only show products in stock
        </p>
      </form>
    `;
  }
}
