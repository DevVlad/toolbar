import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { blue500 } from 'material-ui/styles/colors';

const getHiddenProps = (label, key, handler, disabled) => {
	return {
		insetChildren: true,
		primaryText: label,
		key: `hidden-${key}`,
		onTouchTap: handler,
		disabled
	};
};

const getRaisButtonProps = (key, priority, label, handler, disabled) => {
	return {
		key: `${key}_${priority}`,
		label: label,
		primary: true,
		onClick: handler,
		style: {margin: 12},
		disabled
	};
};

const hideAction = (func, key) => {
	const handler = func.onAction ? func.onAction : () => browserHistory.push(func.href);
	if (func.icon) {
		return (
			<MenuItem
				{...getHiddenProps(func.label, `hiddMenu_${func.priority}_${key}`, handler, func.disabled)}
				leftIcon={func.icon}
				/>
		);
	} else {
		return (
			<MenuItem
				{...getHiddenProps(func.label, `hiddMenu_${func.priority}_${key}`, handler, func.disabled)}
				/>
		);
	}
};

class MaterialToolbar extends Component {
	static propTypes = {
		title: PropTypes.string,
		primaryFunctions: PropTypes.array.isRequired,
		secondaryFunctions: PropTypes.array.isRequired,
		hiddenFunctions: PropTypes.array,
		priorityBreakpoint: PropTypes.number.isRequired,
		primaryElements: PropTypes.array,
		secondaryElements: PropTypes.array,
		toolbarStyle: PropTypes.object,
		titleStyle: PropTypes.object
	};

	actionFactory = (func, key, link) => {
			// complete button to toolbar
		if (link) {
			return (
				<RaisedButton
					{...getRaisButtonProps(key, func.priority, func.label, () => browserHistory.push(func.href), func.disabled)}
					/>
			);
		} else {
			return (
				<RaisedButton
					{...getRaisButtonProps(key, func.priority, func.label, func.onAction, func.disabled)}
					/>
			);
		}
	}

	actionIconFactory = (func, key, link) => {
		if (link) {
			// icon is a link
			return (
				<IconButton
					key={`icon-${key}_${func.priority}`}
					containerElement={<Link to={func.href} />}
					disabled={func.disabled}
					>{func.icon}
				</IconButton>
			);
		} else {
			// icon provides action, but not href
			return (
				<IconButton
					key={`icon-${key}_${func.priority}`}
					onClick={func.onAction}
					disabled={func.disabled}
					>{func.icon}
				</IconButton>
			);
		}
	};

	getHidFuncToToolbar(funcArr = [], additionalFunctions = []) {
		return [...funcArr, ...additionalFunctions].map((func, key) => hideAction(func, key));
	}

	getFuncsToToolbar(resultLabel, funcArr, priorityBP, functionsToHide = []) {
		const functions = funcArr.map((func, key) => {
			const shouldHide = func.priority > priorityBP;
			let action;
			if (func.onAction && !func.href) {
				if (func.icon) {
					action = this.actionIconFactory(func, key);
				} else if (func.label) {
					action = this.actionFactory(func, key)
				} else {
					console.error('Wrong inserted onAction type function to Toolbar: ', func);
				}
			} else {
				if (func.icon) {
					action = this.actionIconFactory(func, key, true);
				} else if (func.label) {
					action = this.actionFactory(func, key, true)
				} else {
					console.error('Wrong inserted link type function to Toolbar: ', func);
				}
			}
			if (shouldHide) {
				functionsToHide.push(func);
				return undefined;
			} else {
				return action;
			}
		}).filter(action => typeof action !== 'undefined');

		return { [resultLabel]: functions, functionsToHide };
	}

	componentWillMount() {
		const { primaryFunctions, secondaryFunctions, hiddenFunctions, priorityBreakpoint } = this.props;
		let { primActions, functionsToHide } = this.getFuncsToToolbar('primActions', primaryFunctions, priorityBreakpoint);
		let { secActions } = this.getFuncsToToolbar('secActions', secondaryFunctions, priorityBreakpoint, functionsToHide);
		let hidActions = this.getHidFuncToToolbar(hiddenFunctions, functionsToHide);
		this.setState({primActions, secActions, hidActions});
	}

	menuProvider() {
		if (this.state.hidActions.length > 0) {
			return (
				<IconMenu
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					iconButtonElement={
						<IconButton touch={true}>
							<NavigationExpandMoreIcon hoverColor={blue500}/>
						</IconButton>
					}
				>{this.state.hidActions}
				</IconMenu>
			);
		} else {
			return null;
		}
	}

	render() {
		const title = this.props.title ? (
			<ToolbarGroup>
				{<ToolbarTitle style={this.props.titleStyle} text={this.props.title} />}
			</ToolbarGroup>
		) : null;

		return (
			<Toolbar style={this.props.toolbarStyle}>
				<ToolbarGroup firstChild={true}>
					{this.state.primActions}
					{this.props.primaryElements}
				</ToolbarGroup>

				{title}

				<ToolbarGroup lastChild={true}>
					{this.props.secondaryElements}
					{this.state.secActions}
					{this.menuProvider()}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

export default MaterialToolbar;
