import { html } from 'lit-html';

const ProductCategoryRow = ({ category }) => html`
  <tr>
    <th colspan="2">${category}</th>
  </tr>
`;

const ProductRow = ({ product }) => {
  const name = product.stocked ? product.name : html`<span style=${{ color: 'red' }}>${product.name}</span>`;

  return html`
    <tr>
      <td>${name}</td>
      <td>${product.price}</td>
    </tr>
  `;
};

const TableRows = ({ products, filterText, inStockOnly }) => {
  let rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows = [...rows, ProductCategoryRow({ category: product.category })];
    }

    rows = [...rows, ProductRow({ product })];
    lastCategory = product.category;
  });

  return rows;
};

export default TableRows;
