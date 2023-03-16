import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { Component } from '@lib';
import { pubSub } from '@utils';
import Note from './Note';

export default class List extends Component {
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
    const { className, handleDelete, notes } = this.props;
    const { id } = this;

    return html`
      <ul class=${className} data-bind=${id}>
        ${repeat(
          notes,
          note => note.id,
          note =>
            this.setChild(Note, note, {
              id: note.id,
              className: `${className}__item note`,
              handleDelete,
              note,
            }),
        )}
      </ul>
    `;
  }
}
