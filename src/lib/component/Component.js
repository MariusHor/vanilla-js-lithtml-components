import UPDATE_APP from '@lib/constants';
import { nanoid } from 'nanoid';
import { activateObserver, debounce } from '../utils';

export default class Component {
  event = new CustomEvent(UPDATE_APP);

  isDispatching = false;

  eventQueue = [];

  debounceUpdateCalls = debounce(event => {
    document.dispatchEvent(event);
  }, 0);

  constructor(options) {
    this.options = options;

    this.$children = new WeakMap();

    this.id = options?.id ?? `id${nanoid()}`;
    this.isFirstLoad = true;
    this.state = {};

    const self = this;

    activateObserver({
      self,
      callbacks: {
        disconnected: this.handleDisconnected,
      },
    });

    this.setup();
  }

  get isActive() {
    return this.state.isActive;
  }

  setup() {
    return this;
  }

  onConnected() {
    return this;
  }

  onDisconnected() {
    return this;
  }

  render() {
    return this;
  }

  update(props = {}) {
    this.props = props;

    if (this.isFirstLoad) {
      this.onConnected();
      this.isFirstLoad = false;
    }

    return this.render();
  }

  setState(props) {
    let newState;

    if (typeof props === 'function') {
      newState = props(this.state);
    } else newState = props;

    this.state = { ...this.state, ...newState };

    this.dispatchUpdate();
  }

  dispatchUpdate() {
    this.debounceUpdateCalls(this.event);
  }

  handleEvent(event) {
    this[`on${event.type}`](event);
  }

  handleDisconnected = () => {
    this.onDisconnected();
    this.isFirstLoad = true;
  };

  setChildren(...args) {
    return args.reduce((childComponents, arg) => {
      if (typeof arg === 'object' && arg.Blueprint && typeof arg.number === 'number') {
        const { Blueprint, number } = arg;

        for (let i = 0; i < number; i += 1) {
          this[`${Blueprint.name}${i + 1}C`] = new Blueprint();
          childComponents.push(this[`${Blueprint.name}${i + 1}C`]);
        }
      } else if (typeof arg === 'function') {
        const Blueprint = arg;

        this[`${Blueprint.name}C`] = new Blueprint();
        childComponents.push(this[`${Blueprint.name}C`]);
      }
      return childComponents;
    }, []);
  }

  setChild(Blueprint, key, props) {
    let component = this.$children.get(key);
    const { id } = props;

    if (!component) {
      component = new Blueprint({ id });

      this.$children.set(key, component);
    }

    return component.update(props);
  }
}
