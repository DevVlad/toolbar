import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router'
import Snackbar from 'material-ui/Snackbar';

import { primaryFunctions, secondaryFunctions, hiddenFunctions, hrefFunctions } from './functionProvider.js';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { blue300 } from 'material-ui/styles/colors';

import Paper from './components/paper.js';
import Toolbar from './components/toolbar.js';
import Streetwalker from './components/streetwalker.js';
import { streetwalkerData } from './testData.js';

injectTapEventPlugin();

class App extends Component {
	constructor() {
		super();
		this.state = {
			isSnackBarOpen: false
		};
	}

	handleInputStrwalker(text) {
		if (text.length === 1) {
			this.setState({
				streetwalkerSearchText: text,
				streetwalkerData: [streetwalkerData[1]]
			});
			setTimeout(() => {
				this.setState({
					streetwalkerData: streetwalkerData
				});
			}, 5000);
		} else {
			this.setState({
				streetwalkerSearchText: text
			});
		}
	}

	render() {
		const msg = 'Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'

		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<Paper>
					<Toolbar
						title="Uber-Toolbar"
						iconColor="white"
						titleStyle={{color: 'white'}}
						toolbarStyle={{backgroundColor: blue300}}
						fontStyle={{color: 'white'}}
						primaryFunctions={hrefFunctions}
						secondaryFunctions={secondaryFunctions}
						hiddenFunctions={hiddenFunctions}
						priorityBreakpoint={1}
						assistant={{
							data: this.state.streetwalkerData,
							onChange: this.handleInputStrwalker.bind(this),
							value: this.state.streetwalkerSearchText
						}}
					/>
					<br/>
					<div>Something else</div>
					<br/>
					<button onClick={() => {browserHistory.push('/Demo1')}}>Browser History - Demo1</button>
					<button onClick={() => {browserHistory.push('/Demo2')}}>Browser History - Demo2</button>
					<br/>
					<button onClick={() => {this.setState({isSnackBarOpen: true})}}>Open Snackbar</button>
					<br/>
					<div>&nbsp;</div>
					{/*}<Streetwalker
						onChange={this.handleInputStrwalker.bind(this)}
						value={this.state.streetwalkerSearchText}
						data={this.state.streetwalkerData}
					/>*/}
					<div>&nbsp;</div>
					<p>saldasdsofosnfsdnfosfosdfosdfnsdofnsdongodfgndo</p>
					<Snackbar
						bodyStyle={{width: 'auto', paddingBottom: '200px'}}
						open={this.state.isSnackBarOpen}
						message={msg}
						action="Close"
						onActionTouchTap={() => this.setState({isSnackBarOpen: false})}
						onRequestClose={() => console.log('Snackbar is closing - onRequestClose')}
					/>
				</Paper>
			</div>
		);
	}
}

export default App;
