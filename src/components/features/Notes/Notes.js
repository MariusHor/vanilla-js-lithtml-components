import { html } from 'lit-html';
import { nanoid } from 'nanoid';
import { Component } from '@lib';
import { Form, List, Feature } from '@components';
import { loadStateFromStorage, saveStateToStorage, pubSub } from '@utils';
import { LOCAL_STORAGE_NOTES_KEY } from '@constants';

import './Notes.scss';

export default class Notes extends Component {
  setup() {
    this.name = 'Notes';
    this.FormC = new Form();
    this.ListC = new List();
  }

  onConnected() {
    this.state = loadStateFromStorage(LOCAL_STORAGE_NOTES_KEY) || {
      notes: [],
      value: '',
    };

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

  handleSubmit = event => {
    event.preventDefault();
    const input = event.target.querySelector('input');

    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          content: prevState.value,
          id: `id${nanoid()}`,
        },
      ],
      value: '',
    }));

    input.value = '';
    input.focus();

    saveStateToStorage(LOCAL_STORAGE_NOTES_KEY, this.state);
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleDelete = event => {
    const id = event.target.parentNode.dataset.bind;

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
    });

    saveStateToStorage(LOCAL_STORAGE_NOTES_KEY, this.state);
  };

  template = () => {
    const { FormC, ListC, handleSubmit, handleChange, handleDelete } = this;
    const { notes, value } = this.state;

    return html`
      ${FormC.update({
        className: 'form',
        handleSubmit,
        handleChange,
        value,
      })}
      ${notes.length
        ? ListC.update({
            className: 'list',
            notes,
            handleDelete,
          })
        : ''}
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Notes',
        className: 'feature--notes',
        template,
        id,
      })}
    `;
  }
}
