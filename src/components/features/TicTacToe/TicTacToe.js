import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';
import { Board, Move, Feature } from '@components';
import calculateWinner from './helpers';

import './TicTacToe.scss';

export default class TicTacToe extends Component {
  setup() {
    this.BoardC = new Board();
  }

  onConnected() {
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
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

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentPlay = history.at(-1);
    const squares = [...currentPlay.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: [...history, { squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  template = () => {
    const { BoardC, handleClick } = this;
    const { history, stepNumber } = this.state;

    const currentPlay = history[stepNumber];
    const winner = calculateWinner(currentPlay.squares);

    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return html`
      ${BoardC.update({
        squares: currentPlay.squares,
        action: handleClick,
        className: 'game-board',
      })}
      <div class="game-info">
        <h3>${status}</h3>
        <ol class="list">
          ${history.map((historyInstance, step) =>
            this.setChild(Move, historyInstance, {
              step,
              action: () => this.jumpTo(step),
            }),
          )}
        </ol>
      </div>
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Tic Tac Toe',
        className: 'feature--tic-tac-toe',
        template,
        id,
      })}
    `;
  }
}
