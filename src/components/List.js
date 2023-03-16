import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';
import Note from './Note';

export default class List extends Component {
  setup() {
    this.name = 'List';
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
