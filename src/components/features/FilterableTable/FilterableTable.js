import { html } from 'lit-html';
import { Component } from '@lib';
import { Feature, SearchBar, ProductTable } from '@components';
import { hasConnected, hasDisconnected } from '@utils';
import productsData from './data';

import './Filterabletable.scss';

export default class FilterableTable extends Component {
  setup() {
    this.name = 'FilterableTable';
    this.SearchBarC = new SearchBar();
    this.ProductTableC = new ProductTable();
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });

    this.state = {
      filterText: '',
      inStockOnly: false,
    };

    this.products = productsData;
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
  }

  handleFilterTextChange = filterText => {
    this.setState({
      filterText,
    });
  };

  handleInStockChange = inStockOnly => {
    this.setState({
      inStockOnly,
    });
  };

  template = () => {
    const { filterText, inStockOnly } = this.state;
    const { handleFilterTextChange, handleInStockChange, SearchBarC, ProductTableC, products } = this;

    return html`
      ${SearchBarC.update({
        inputValue: filterText,
        isChecked: inStockOnly,
        onTextInputChange: e => handleFilterTextChange(e.target.value),
        onCheckboxChange: e => handleInStockChange(e.target.checked),
      })}
      ${ProductTableC.update({
        products,
        filterText,
        inStockOnly,
      })}
    `;
  };

  render() {
    const { template, id } = this;

    return html`
      ${Feature({
        title: 'Filterable Table',
        className: 'feature--products-table',
        template,
        id,
      })}
    `;
  }
}
