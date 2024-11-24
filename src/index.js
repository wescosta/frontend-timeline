import React from 'react';
import { render } from 'react-dom';
import { ErrorBoundary, Timeline } from './components';

import './styles/dialog.css';
import './styles/timeline.css';

const App = () => (
  <div>
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
    <Timeline />
  </div>
);

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);