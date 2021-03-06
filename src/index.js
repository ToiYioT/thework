import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { TheWorkProvider } from './contexts/TheWorkContext';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <TheWorkProvider>
      <App />
    </TheWorkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorkerRegistration.register();