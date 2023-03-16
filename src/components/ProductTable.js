import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';
import TableRows from './TableRows';

export default class ProductTable extends Component {
  setup() {
    this.name = 'ProductTable';
  }

  onConnected() {
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
    const { id } = this;
    const { filterText, inStockOnly, products } = this.props;

    return html`
      <table data-bind=${id}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${TableRows({ filterText, inStockOnly, products })}
        </tbody>
      </table>
    `;
  }
}
