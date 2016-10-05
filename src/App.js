import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Comment from 'material-ui/svg-icons/editor/insert-comment';

import logo from './logo.svg';
import './App.css';
import { blue500, red500 } from 'material-ui/styles/colors';

import Paper from './components/paper.js';
import Toolbar from './components/toolbar.js';

injectTapEventPlugin();

class App extends Component {

	render() {
		const primaryFunctions = [
			{
				onAction: () => {console.log('action1')},
				label: 'primAction1',
				icon: <NavigationClose hoverColor={red500}/>,
				disabled: false,
				priority: 1
			}, {
				onAction: () => {console.log('action2')},
				label: 'primAction2',
				disabled: true,
				priority: 2
			},
			{
				onAction: () => {console.log('action3')},
				label: 'primAction3',
				icon: <Edit hoverColor={blue500}/>,
				disabled: false,
				priority: 3
			}
		];

		const secondaryFunctions = [
			{
				onAction: () => {console.log('action4')},
				label: 'secAction1',
				disabled: false,
				priority: 3
			}, {
				onAction: () => {console.log('action5')},
				label: 'secAction2',
				icon: <Comment hoverColor={blue500}/>,
				disabled: true,
				priority: 2
			},
			{
				onAction: () => {console.log('action6')},
				label: 'secAction3',
				icon: <MoreVertIcon hoverColor={blue500}/>,
				disabled: false,
				priority: 1
			}
		];

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
						enableListeningToParentWidth
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
