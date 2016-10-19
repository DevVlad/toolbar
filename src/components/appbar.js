import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MainBar from './mainBar.js';
import Streetwalker from './streetwalker.js';

import { hrefFunctions } from '../functionProvider.js';
import { streetwalkerData } from '../testData.js';

import { blue100, blue300 } from 'material-ui/styles/colors';

const style = {
	height: '80%',
	width: '80%',
	margin: 20,
	display: 'inline-block',
};

const Menu = (menuProps = {}) => (
	<IconMenu
		{...menuProps}
		iconButtonElement={
			<IconButton><MoreVertIcon hoverColor={blue100} style={{verticalAlign: 'middle'}} color="white"/></IconButton>
		}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<MenuItem primaryText="Refresh" />
		<MenuItem primaryText="Help" />
		<MenuItem primaryText="Sign out" />
	</IconMenu>
);

class Appbar extends Component {
	constructor() {
		super();
		this.state = {
			streetwalkerSearchText: '',
			streetwalkerData: []
		};
	}

	handleInputStrwalker(text) {
		if (text.length === 1) {
			this.setState({
				streetwalkerSearchText: text,
				streetwalkerData: [streetwalkerData[0]]
			});
		} else if (text.length > 1) {
			this.setState({
				streetwalkerSearchText: text,
				streetwalkerData: streetwalkerData
			});
		} else {
			this.setState({
				streetwalkerSearchText: '',
				streetwalkerData: []
			});
		}
	}

	render() {
		return (
			<Paper style={style} zDepth={2}>
				<MainBar
					toolbarStyle={{backgroundColor: blue300}}
					title="AppBarTitle"
					titleStyle={{color: 'white'}}
					helper={
						<Streetwalker
							onChange={this.handleInputStrwalker.bind(this)}
							value={this.state.streetwalkerSearchText}
							data={this.state.streetwalkerData}
							inputStyle={{
								width: '250px'
							}}
						/>
					}
					// primaryFunctions={hrefFunctions}
					// secondaryElements={[<Menu key={'menu'}/>]}
					// priorityBreakpoint={50}
					/>
				<h4 style={{zIndex: -12, textAlign: 'center'}}>AppBar Route</h4>
			</Paper>
		);
	}
}

export default Appbar;
