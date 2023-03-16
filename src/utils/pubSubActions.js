import pubSub from './pubSub';

export const hasConnected = ({ name, id }) => {
  pubSub.publish('connected', {
    name,
    id,
  });
};

export const hasDisconnected = ({ name, id }) => {
  pubSub.publish('disconnected', {
    name,
    id,
  });
};
