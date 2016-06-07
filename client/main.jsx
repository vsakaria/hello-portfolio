'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import './images/wat.css';

import Index from 'components/Index/Index';

render(<Index items={[1,2,3]} />, document.getElementById('start-here'));
