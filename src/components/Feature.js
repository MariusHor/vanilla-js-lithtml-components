import { html } from 'lit-html';

const Feature = ({ template, title, className, id }) => html`
  <div class="feature ${className}" data-bind=${id}>
    <h2>${title}</h2>
    ${template()}
  </div>
`;

export default Feature;
