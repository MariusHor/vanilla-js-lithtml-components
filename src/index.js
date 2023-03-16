import { buildApp } from '@lib';
import App from './App';

const root = document.querySelector('#app');
const app = new App({ root });

buildApp(root, app);
