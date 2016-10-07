import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { blue500 } from 'material-ui/styles/colors';

const commonPropsHidAct = (label, key, handler, disabled) => {
	return {
		style: {display: 'flex', justifyContent: 'center'},
		insetChildren: true,
		primaryText: label,
		key: `hidden-${key}`,
		onTouchTap: handler,
		disabled
	};
};

const commonPropsRaisButt = (key, priority, label, handler, disabled) => {
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
	// const handler = func.onAction;
	const handler = func.onAction ? func.onAction : () => window.location.href=`${func.href}`;
	if (func.icon) {
		return (
			<MenuItem
				{...commonPropsHidAct(func.label, `hiddMenu_${func.priority}_${key}`, handler, func.disabled)}
				leftIcon={func.icon}
				/>
		);
	} else {
		return (
			<MenuItem
				{...commonPropsHidAct(func.label, `hiddMenu_${func.priority}_${key}`, handler, func.disabled)}
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
		priorityBreakpoint: PropTypes.number.isRequired
	};

	actionFactory = (func, key, link) => {
			// complete button to toolbar
		if (link) {
			<RaisedButton
				{...commonPropsRaisButt(key, func.priority, func.label, undefined, func.disabled)}
				><Link to={func.href} />
			</RaisedButton>
		} else {
			return (
				<RaisedButton
					{...commonPropsRaisButt(key, func.priority, func.label, func.onAction, func.disabled)}
					/>
			);
		}
	}

	actionIconFactory = (func, key, link) => {
		if (link) {
			// is it link icon
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
		return (
			<Toolbar>
				<ToolbarGroup firstChild={true}>
					{this.state.primActions}
				</ToolbarGroup>

				<ToolbarGroup>
					<ToolbarTitle text={this.props.title} />
				</ToolbarGroup>

				<ToolbarGroup lastChild={true}>
					{this.state.secActions}
					{this.menuProvider()}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

export default MaterialToolbar;
