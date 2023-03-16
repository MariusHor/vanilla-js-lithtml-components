import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';
import Button from './Button';

export default class Board extends Component {
  setup() {
    this.name = 'Board';
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });

    this.steps = [];

    for (let i = 0; i <= 8; i += 1) {
      this.steps = [...this.steps, { i }];
    }
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
  }

  render() {
    const { steps, id } = this;
    const { action, squares, className, winningPos } = this.props;

    const findWinningSquares = step => (winningPos ? winningPos.some(pos => pos === step) : false);

    const generateSquares = (...slice) =>
      repeat(
        steps.slice(...slice),
        step => step.id,
        step =>
          this.setChild(Button, step, {
            text: squares[step.i],
            action: action.bind(this, step.i),
            className: findWinningSquares(step.i) ? 'button--square active' : 'button--square',
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
