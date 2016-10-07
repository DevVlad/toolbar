import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { primaryFunctions, secondaryFunctions, hiddenFunctions } from './functionProvider.js';

import logo from './logo.svg';
import './App.css';

import Paper from './components/paper.js';
import Toolbar from './components/toolbar.js';

injectTapEventPlugin();

class App extends Component {

	render() {
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
				</Paper>
			</div>
		);
	}
}

export default App;
