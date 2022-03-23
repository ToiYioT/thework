import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { TheWorkProvider } from './contexts/TheWorkContext';

ReactDOM.render(
  <React.StrictMode>
    <TheWorkProvider>
      <App />
    </TheWorkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

