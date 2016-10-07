import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import Demo1 from './components/demo1.js';
import Demo2 from './components/demo2.js';
import AppbarComponent from './components/appbar.js';

import './index.css';

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={browserHistory}>
			<Route path="/" component={App} />
			<Route path="/demo1" component={Demo1}/>
			<Route path="/demo2" component={Demo2}/>
			<Route path="/appbar" component={AppbarComponent}/>
		</Router>
	</MuiThemeProvider>,
	document.getElementById('root')
);
