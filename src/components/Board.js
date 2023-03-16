import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { Component } from '@lib';
import { pubSub } from '@utils';
import Button from './Button';

export default class Board extends Component {
  setup() {
    this.name = 'Board';
  }

  onConnected() {
    this.steps = [];

    for (let i = 0; i <= 8; i += 1) {
      this.steps = [...this.steps, { i }];
    }

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
    const { steps, id } = this;
    const { action, squares, className } = this.props;

    const generateSquares = (...slice) =>
      repeat(
        steps.slice(...slice),
        step => step.id,
        step =>
          this.setChild(Button, step, {
            text: squares[step.i],
            action: action.bind(this, step.i),
            className: 'button--square',
          }),
      );

    return html`
      <div class=${className} data-bind=${id}>
        <div class="board-row">${generateSquares(0, 3)}</div>
        <div class="board-row">${generateSquares(3, 6)}</div>
        <div class="board-row">${generateSquares(6)}</div>
      </div>
    `;
  }
}
