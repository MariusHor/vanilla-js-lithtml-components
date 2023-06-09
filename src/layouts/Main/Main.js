import { html } from 'lit-html';
import { Component } from '@lib';
import { hasConnected, hasDisconnected, toggleActive } from '@utils';
import Features from '@components/features';
import Sidebar from '../Sidebar/Sidebar';

import './Main.scss';

export default class Main extends Component {
  setup() {
    this.name = 'Main';
    this.SidebarLeftC = new Sidebar();
    this.SidebarRightC = new Sidebar();

    this.featureComponents = this.setChildren(...Features);
  }

  onConnected() {
    const { name, id } = this;

    hasConnected({ name, id });
  }

  onDisconnected() {
    const { name, id } = this;

    hasDisconnected({ name, id });
  }

  handleFeatureSelect = event => {
    const featureSelectBtns = document.querySelectorAll('.feature-btn');
    toggleActive(featureSelectBtns, event.target, 'active');

    this.setState({
      selectedFeatureId: event.target.dataset.bindto,
    });
  };

  render() {
    const { id, SidebarRightC, SidebarLeftC, featureComponents, handleFeatureSelect } = this;
    const { className, connectedComps, rootId } = this.props;
    const { selectedFeatureId } = this.state;

    const selectedFeature = featureComponents.find(feature => feature.id === selectedFeatureId);

    return html`
      <main class=${className} data-bind=${id}>
        ${SidebarLeftC.update({
          className: 'sidebar--left',
          isLeftSidebar: true,
          components: featureComponents,
          handleFeatureSelect,
        })}
        ${selectedFeature
          ? selectedFeature.update()
          : html`<h2 class="main__default-message">Please select a feature to try out</h2>`}
        ${SidebarRightC.update({
          className: 'sidebar--right',
          isRightSidebar: true,
          components: connectedComps,
          rootId,
        })}
      </main>
    `;
  }
}
