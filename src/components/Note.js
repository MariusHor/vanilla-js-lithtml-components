import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';
import Button from './Button';

export default class Note extends Component {
  setup() {
    this.name = 'Note';
    this.ButtonC = new Button();
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
