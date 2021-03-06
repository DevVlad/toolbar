import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App.js';
import Demo1 from './pages/demo1.js';
import Demo2 from './pages/demo2.js';

import './index.css';

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={browserHistory}>
			<Route path="/" component={App} />
			<Route path="/demo1" component={Demo1}/>
			<Route path="/demo2" component={Demo2}/>
		</Router>
	</MuiThemeProvider>,
	document.getElementById('root')
);
