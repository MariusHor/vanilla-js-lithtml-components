import { html } from 'lit-html';
import { Component } from '@lib';
import { Button, Feature } from '@components';
import { LOCAL_STORAGE_COUNTER_KEY } from '@constants';
import { loadStateFromStorage, saveStateToStorage, pubSub } from '@utils';

export default class Counter extends Component {
  setup() {
    this.ButtonMinus = new Button();
    this.ButtonPlus = new Button();
  }

  onConnected() {
    this.state = loadStateFromStorage(LOCAL_STORAGE_COUNTER_KEY) || {
      count: 0,
    };

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

  handleIncreaseCount = () => {
    this.setState(prevState => {
      const newCount = prevState.count + 1;
      return { count: newCount };
    });

    saveStateToStorage(LOCAL_STORAGE_COUNTER_KEY, this.state);
  };

  handleDecreaseCount = () => {
    this.setState(prevState => {
      const newCount = prevState.count - 1;
      return { count: newCount };
    });

    saveStateToStorage(LOCAL_STORAGE_COUNTER_KEY, this.state);
  };

  template = () => {
    const { ButtonPlus, ButtonMinus, handleDecreaseCount, handleIncreaseCount } = this;
    const { className } = this.props;
    const { count } = this.state;

    return html`
      <div class=${className} data-bind=${this.id}>
        ${ButtonMinus.update({ action: handleDecreaseCount, text: '-' })}
        <span>${count}</span>
        ${ButtonPlus.update({ action: handleIncreaseCount, text: '+' })}
      </div>
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Counter',
        className: 'feature--counter',
        template,
        id,
      })}
    `;
  }
}
