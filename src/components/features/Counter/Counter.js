import { html } from 'lit-html';
import { Component } from '@lib';
import { Button, Feature } from '@components';
import { LOCAL_STORAGE_COUNTER_KEY } from '@constants';
import { loadStateFromStorage, saveStateToStorage, hasConnected, hasDisconnected } from '@utils';

export default class Counter extends Component {
  setup() {
    this.name = 'Counter';
    this.ButtonMinus = new Button();
    this.ButtonPlus = new Button();
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });

    this.state = loadStateFromStorage(LOCAL_STORAGE_COUNTER_KEY) || {
      count: 0,
    };
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
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
