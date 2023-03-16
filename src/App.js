import { html } from 'lit-html';
import { Header, Main } from '@layouts';
import { Component } from '@lib';
import pubSub from '@utils';

import './App.scss';

export default class App extends Component {
  setup() {
    this.setChildren(Header, Main);
  }

  onConnected() {
    this.state = {
      connectedComps: [],
    };

    pubSub.subscribe('connected', this.handleConnectedComps);
    pubSub.subscribe('disconnected', this.handleDisconnectedComps);

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
