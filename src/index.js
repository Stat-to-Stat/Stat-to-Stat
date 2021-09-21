import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorkerRegistration.register();
