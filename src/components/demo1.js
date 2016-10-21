import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import Toolbar from './toolbar.js';

import { primaryFunctions, secondaryFunctions } from '../functionProvider.js';

const style = {
	height: '80%',
	width: '80%',
	margin: 20,
	display: 'inline-block',
	textAlign: 'center'
};

const menuItemsProps= [{primaryText:"Single",insetChildren:true}, {primaryText:"Double",insetChildren:true}, {primaryText:"Add space before paragraph"}]

class Demo1 extends Component {
	constructor() {
		super();
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			focusedItem: 0
		};
	}

	handleKeyDown(event) {
		event.stopPropagation();
		if (event.keyCode === 40) {
			console.log('should increment');
			setTimeout(() => {
				this.setState({focusedItem: this.state.focusedItem + 1});
			}, 0);
		}
		if (event.keyCode === 38) {
			console.log('should decrement');
			setTimeout(() => {
				this.setState({focusedItem: this.state.focusedItem - 1});
			}, 0);

		}
	}

	getItems() {
		return menuItemsProps.map((item, key) => {
			const isFocused = this.state.focusedItem === key ? "focused" : "none";
			console.log('getItems', isFocused, key);
			return <MenuItem key={key} {...item} focusState={isFocused}/>;
		});
	}

	render() {
		console.log('RENDER DEMO1_', this.state);
		return (
			<Paper style={style} zDepth={2}>
				<Toolbar
					title="Toolbar example"
					primaryFunctions={primaryFunctions}
					secondaryFunctions={secondaryFunctions}
					priorityBreakpoint={1}
				/>
				<h4>Demo1 Route</h4>
				<Paper style={{display: 'inline-block'}}>
					<Menu
						desktop={true}
						width={320}
						onKeyDown={this.handleKeyDown}
						initiallyKeyboardFocused={true}
					>{this.getItems()}
					</Menu>
				</Paper>
			</Paper>
		);
	}
}

export default Demo1;
