import { html } from 'lit-html';
import { Component } from '@lib';
import { pubSub } from '@utils';

import './Sidebar.scss';

export default class Sidebar extends Component {
  setup() {
    this.name = 'Sidebar';
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

  sidebarRight = () => {
    const { components, className } = this.props;

    return html`
      <h3>Active components</h3>
      <h4>count: ${components.length}</h4>
      <ul class=${`${className}__list`}>
        ${components.map(
          comp => html` <li>
            <button class="button" @click=${this.handleClick} data-bindTo=${comp.id}>${comp.name}</button>
          </li>`,
        )}
      </ul>
    `;
  };

  sidebarLeft = () => {
    const { components, handleFeatureSelect, className } = this.props;

    return html`
      <h3>Features</h3>
      <ul class=${`list ${className}__list`}>
        ${components.map(
          component => html` <li>
            <button class="button" @click=${handleFeatureSelect} data-bindTo=${component.id}>
              ${component.name}
            </button>
          </li>`,
        )}
      </ul>
    `;
  };

  handleClick = e => {
    const { rootId } = this.props;
    let element;

    if (e.target.dataset.bindto === rootId) {
      element = document.querySelector(`#app`);
    } else {
      element = document.querySelector(`[data-bind=${e.target.dataset.bindto}]`);
    }

    element.classList.add('highlight');

    setTimeout(() => {
      element.classList.remove('highlight');
    }, 3000);
  };

  render() {
    const { id, sidebarLeft, sidebarRight } = this;
    const { className, isLeftSidebar } = this.props;

    return html`
      <div class=${`sidebar ${className}`} data-bind=${id}>
        ${isLeftSidebar ? sidebarLeft() : sidebarRight()}
      </div>
    `;
  }
}
