import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected } from '@utils';
import TableRows from './TableRows';

export default class ProductTable extends Component {
  setup() {
    this.name = 'ProductTable';
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
