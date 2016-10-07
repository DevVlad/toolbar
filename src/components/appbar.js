import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Search from 'material-ui/svg-icons/action/search';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MaterialAppBar from './materialAppBar.js';

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
			<IconButton><MoreVertIcon color="white"/></IconButton>
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

	render() {
		return (
			<Paper style={style} zDepth={2}>
				<MaterialAppBar
					helper={
						<input
							style={{
								verticalAlign: 'middle',
								height: '50%',
								fontSize: '80%'
							}}
							/>
					}
					left={<IconButton><NavigationClose color={'white'}/></IconButton>}
					right={<Menu/>}
					title={'AppBarTitle'}
					/>
				<h4 style={{textAlign: 'center'}}>AppBar Route</h4>
			</Paper>
		);
	}
}

export default Appbar;
