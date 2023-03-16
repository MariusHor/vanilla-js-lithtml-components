import { html } from 'lit-html';
import { Component } from '@lib';
import { Button, Feature } from '@components';
import pubSub from '@utils';

export default class Clock extends Component {
  setup() {
    this.ButtonAdd = new Button();
    this.ButtonDel = new Button();
  }

  onConnected() {
    this.state = {
      isClockActive: true,
      date: new Date(),
    };

    pubSub.publish('connected', {
      name: this.constructor.name,
      id: this.id,
    });

    if (this.state.isClockActive) this.interval = setInterval(() => this.tick(), 1000);
  }

  onDisconnected() {
    pubSub.publish('disconnected', {
      name: this.constructor.name,
      id: this.id,
    });

    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  template = () => {
    const { ButtonAdd, ButtonDel } = this;
    const { date, isClockActive } = this.state;

    return html`
    ${
      isClockActive
        ? html`
            <h3>It is ${date.toLocaleTimeString()}</h3>
            ${ButtonDel.update({
              action: () => {
                this.setState({
                  isClockActive: !isClockActive,
                });
                clearInterval(this.interval);
              },

              text: 'Remove Clock',
            })}
          `
        : html`
            <h3>Clock removed</h3>
            ${ButtonAdd.update({
              action: () => {
                this.setState({
                  isClockActive: !isClockActive,
                  date: new Date(),
                });
                this.interval = setInterval(() => this.tick(), 1000);
              },
              text: 'add Clock',
            })}
          `
    }
      </div>
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Clock',
        className: 'feature--clock',
        template,
        id,
      })}
    `;
  }
}
