import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router'

import { primaryFunctions, secondaryFunctions, hiddenFunctions } from './functionProvider.js';

import logo from './logo.svg';
import './App.css';

import Paper from './components/paper.js';
import Toolbar from './components/toolbar.js';

injectTapEventPlugin();

class App extends Component {

	render() {
		console.log(browserHistory);
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<Paper>
					<Toolbar
						title="Toolbar example"
						primaryFunctions={primaryFunctions}
						secondaryFunctions={secondaryFunctions}
						hiddenFunctions={hiddenFunctions}
						priorityBreakpoint={2}
					/>
					<br/>
					<div>Something else</div>
					<br/>
					<button onClick={() => {browserHistory.push('/Demo1')}}>Browser History - Demo1</button>
					<button onClick={() => {browserHistory.push('/Demo2')}}>Browser History - Demo2</button>
					<br/>
				</Paper>
			</div>
		);
	}
}

export default App;
