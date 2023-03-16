import { html } from 'lit-html';
import { Header, Main } from '@layouts';
import { Component } from '@lib';
import { pubSub, hasConnected, hasDisconnected } from '@utils';

import './App.scss';

export default class App extends Component {
  setup() {
    this.name = 'App';
    this.setChildren(Header, Main);
  }

  onConnected() {
    this.state = {
      connectedComps: [],
    };

    pubSub.subscribe('connected', this.handleConnectedComps);
    pubSub.subscribe('disconnected', this.handleDisconnectedComps);

    const { name, id } = this;

    hasConnected({ name, id });
  }

  onDisconnected() {
    const { name, id } = this;
    hasDisconnected({ name, id });
  }

  handleConnectedComps = comp => {
    this.setState(prevState => ({
      connectedComps: [...prevState.connectedComps, comp],
    }));
  };

  handleDisconnectedComps = comp => {
    this.setState(prevState => ({
      connectedComps: prevState.connectedComps.filter(prevComp => comp.id !== prevComp.id),
    }));
  };

  render() {
    const { HeaderC, MainC } = this;
    const { connectedComps } = this.state;

    return html`
      ${HeaderC.update({ className: 'header' })}
      ${MainC.update({
        className: 'main',
        connectedComps,
        rootId: this.id,
      })}
    `;
  }
}
