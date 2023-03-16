import { render } from 'lit-html';
import UPDATE_APP from '@lib/constants';
import { setEvent } from './utils';

function buildApp(root, app) {
  const subscriber = payload => {
    render(app.update(payload), root);
  };

  setEvent(UPDATE_APP, subscriber);

  app.dispatchUpdate();
}

export default buildApp;
