import React from 'react'
import { render } from 'react-dom'

import './assets/css/bootstrap.min.css';

import './assets/css/sb-admin-2.css';

import './assets/fonts/font-awesome/css/font-awesome.min.css';



import App from './containers/App'

import registerServiceWorker from './registerServiceWorker';

render(
    <App />,
    document.getElementById('root')
)
registerServiceWorker();
