import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';

export default class SearchBar extends Component {
  setup() {
    this.name = 'SearchBar';
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
