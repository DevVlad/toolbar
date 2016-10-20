import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Streetwalker from './streetwalker.js';
import Home from 'material-ui/svg-icons/action/home';

const iconMultiplier = 5;

const centerStyles = {
	left: (index) => {
		return {
			position: 'relative',
			top: '50%',
			marginLeft: '20px',
			transform: `translate(${index + 30}%, -50%)`
		};
	},
	right: (index) => {
		return {
			position: 'relative',
			top: '50%',
			marginLeft: '20px',
			transform: `translate(${index - 30}%, -50%)`
		};
	}
};

const getRaisButtonProps = (priority, label, handler, disabled) => {
	return {
		key: `${label}_${priority}`,
		label: label,
		primary: true,
		onClick: handler,
		style: {margin: 12},
		disabled
	};
};

class Appbar extends Component {
	getButtonPlugin(func, defaultStyle) {
		if (func.href) {
			return (
				<RaisedButton
					{...getRaisButtonProps(func.priority, func.label, () => <Link to={func.href}/>, func.disabled)}
					/>
			);
		} else {
			return (
				<RaisedButton
					{...getRaisButtonProps(func.priority, func.label, func.onAction, func.disabled)}
					/>
			);
		}
	}

	getIconPlugin(func, defaultStyle) {
		if (func.href) {
			return (
				<IconButton
					style={defaultStyle}
					key={`icon-${func.label}_${func.priority}`}
					containerElement={<Link to={func.href} />}
					disabled={func.disabled}
					>{func.icon}
				</IconButton>
			);
		} else {
			return (
				<IconButton
					style={defaultStyle}
					key={`icon-${func.label}_${func.priority}`}
					onClick={func.onAction}
					disabled={func.disabled}
					>{func.icon}
				</IconButton>
			);
		}
	}

	functionFactory(functions, getStyle) {
		console.log('functionFactory', functions);
		if (functions) {
			return functions.map((fn, index) => {
				if (fn.icon) {
					return this.getIconPlugin(fn, getStyle(index));
				} else {

				}
			});
		}
	}
	getPlugins(side) {
		switch(side) {
			case('prim'):
				return this.functionFactory(this.props.primaryFunctions, centerStyles.left);
			case('sec'):
				return this.functionFactory(this.props.secondaryFunctions, centerStyles.right);
				return;
			default:
				return;
		}
	}
	assistant() {
		if (this.props.assistant && this.props.assistant.data) {
			return (
				<Streetwalker
					style={{
						position: 'absolute',
						maxWidth: '100%',
						width: '100%',
						top: '50%',
						transform: `translateY(-50%)`
					}}
					{...this.props.assistant}
				/>
			);
		} else {
			return null;
		}
	}
	render() {
		return(
			<Toolbar style={this.props.toolbarStyle}>
				<ToolbarGroup firstChild={true}>
					{this.getPlugins('prim')}
					{this.props.primaryElements}
				</ToolbarGroup>

				<ToolbarGroup>
					{<ToolbarTitle style={{top: '-8%', ...this.props.titleStyle}} text={this.props.title} />}
					{this.assistant()}
				</ToolbarGroup>

				<ToolbarGroup lastChild={true}>
					{this.props.secondaryElements}
					{this.getPlugins('sec')}
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

export default Appbar;
