import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

import { blue100 } from 'material-ui/styles/colors';

const style = {
	height: '80%',
	width: '80%',
	margin: 20,
	display: 'inline-block',
};

class MaterialAppBar extends Component {
	static propTypes = {
		helper: PropTypes.object,
		left: PropTypes.object,
		right: PropTypes.object,
		title: PropTypes.string
	};

	constructor() {
		super();
		this.state = {
			isHelperRequired: false
		};
	}

	renderHelper = () => {
		if (this.props.helper) {
			let res;
			if (this.state.isHelperRequired) {
				res = this.props.helper;
			} else {
				res = (
					<IconButton
						onClick={() => this.setState({isHelperRequired: true})}
						style={{verticalAlign: 'middle'}}
						><Search hoverColor={blue100} color="white"/>
					</IconButton>
				);
			}
			return res;
		} else {
			return this.props.title;
		}
	}

	handleAppBarClick() {
		if (this.props.helper) {
			this.setState({isHelperRequired: this.state.isHelperRequired ? this.state.isHelperRequired : false});
		}
	}

	render() {
		return (
			<AppBar
				style={{marginTop: '0px'}}
				title={this.renderHelper()}
				iconElementLeft={this.props.left}
				iconElementRight={this.props.right}
				onTitleTouchTap={this.handleAppBarClick.bind(this)}
			/>
		);
	}
}

export default MaterialAppBar;
