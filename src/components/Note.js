import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';
import Button from './Button';

export default class Note extends Component {
  setup() {
    this.name = 'Note';
    this.ButtonC = new Button();
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
    const { ButtonC, id } = this;
    const { handleDelete, note, className } = this.props;

    return html`
      <li class=${className} data-bind=${id}>
        <span>${note.content}</span>
        ${ButtonC.update({
          type: 'button',
          className: 'button button--delete',
          text: 'Delete',
          action: handleDelete,
        })}
      </li>
    `;
  }
}
