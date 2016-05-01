require('setup');
import React from 'react';
import { render } from 'react-dom';

import MainRouter from './routes.jsx';

render (
    MainRouter,
    document.getElementById('app')
)
