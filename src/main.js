import React, { createRoot } from './lib/react.js';
import { App } from './app/App.js';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
}
