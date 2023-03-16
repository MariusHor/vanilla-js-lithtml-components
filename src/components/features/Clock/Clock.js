import { html } from 'lit-html';
import { Component } from '@lib';
import { Button, Feature } from '@components';
import { hasConnected, hasDisconnected } from '@utils';

export default class Clock extends Component {
  setup() {
    this.name = 'Clock';

    this.ButtonAdd = new Button();
    this.ButtonDel = new Button();
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });

    this.state = {
      isClockActive: true,
      date: new Date(),
    };

    if (this.state.isClockActive) this.interval = setInterval(() => this.tick(), 1000);
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });

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
