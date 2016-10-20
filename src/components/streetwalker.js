import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import ClickAwayListener from 'material-ui/internal/ClickAwayListener';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey500 } from 'material-ui/styles/colors';


const defaultStyle = {
	input: {
		width: '70%',
		maxWidth: '70%',
		display: 'inline-block',
		zIndex: 90,
	},
	paper: {
		maxHeight: '400px',
		dosplay: 'inline-block',
		overflowY: 'scroll',
		overflowX: 'hidden'
	},
	menu: {
		width: '100%',
		maxWidth: '100%',
		textAlign: 'left',
	},
	menuItem: {
		maxWidth: '100%'
	}
};

class Streetwalker extends Component {
	constructor(props) {
		super(props);

		this.handleSearchText = this.handleSearchText.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleExternalFunction = this.handleExternalFunction.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			styles: {
				inputStyle: {
					paddingLeft: '25px',
					...defaultStyle.input,
					...props.inputStyle
				},
				paperStyle: {
					...defaultStyle.input,
					...defaultStyle.paper,
					...props.paperStyle
				},
				menuStyle: {
					...defaultStyle.menu,
					...props.menuStyle
				},
				menuItemStyle: {
					...defaultStyle.menuItem,
					...props.menuItemStyle
				}
			},
			placeholder: props.placeHolder || 'Search',
			isMenu: false,
			showMenu: props.data ? true : false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data && !this.state.showMenu) {
			this.setState({showMenu: true});
		}
	}

	handleExternalFunction(action) {
		console.log('handleExternalFunction', action.fn(action.item));
		// Something
		this.props.onChange(action.fn(action.item));
	}

	focusInput() {
		setTimeout(() => {
			this.refs.input.focus();
		}, 0);
	}

	handleSearchText(event) {
		this.props.onChange(event.target.value);
		this.focusInput();
	}

	handleClick(event) {
		if (this.props.data) {
			this.setState({
				showMenu: !this.state.showMenu
			});
			this.focusInput();
		}
	}

	handleKeyDown(event) {
		// handle arrow-down
		if (event.keyCode === 40) {
			this.setState({
				inMenu: true,
				showMenu: this.props.value && this.props.data ? true : false
			});
		}
		// handleEsc
		if (event.keyCode === 27) {
			this.setState({
				showMenu: false
			});
			this.focusInput();
		}
	}

	handleMenuClose() {
		this.setState({
			inMenu: false,
			showMenu: false
		});
		this.focusInput();
	}

	getMenu() {
		if (this.props.value && this.props.data) {
			return (
				<StreetwalkerResults
					data={this.props.data}
					menuStyle={this.state.styles.menuStyle}
					paperStyle={this.state.styles.paperStyle}
					menuItemStyle={this.state.styles.menuItemStyle}
					menuProps={this.props.menuProps}
					onClose={this.handleMenuClose}
					showMenu={this.state.showMenu}
					externalFunction={this.handleExternalFunction}
				/>
			);
		}
		return null;
	}

	render() {
		return (
			<div style={this.props.style}>
				<SearchIcon
					style={{
						position: 'absolute',
						transform: 'translate(5px, 8px)',
						// transform: 'translate(0px, 5px)',
						opacity: '0.8',
						width: '18px',
						height: '18px'
					}}
					color={grey500}
				/>
				<input
					ref="input"
					className="form-control"
					style={this.state.styles.inputStyle}
					type="text"
					placeholder="Search"
					onChange={this.handleSearchText}
					value={this.props.value || ''}
					onKeyDown={this.handleKeyDown}
					onClick={this.handleClick}
				/>
					{this.getMenu()}
			</div>
		);
	}
}

export default Streetwalker;

Streetwalker.propTypes = {
	data: PropTypes.array,
	value: PropTypes.string,
	style: PropTypes.object,
	inputStyle: PropTypes.object,
	menuStyle: PropTypes.object,
	paperStyle: PropTypes.object,
	placeHolder: PropTypes.string,
	menuProps: PropTypes.object,
	onChange: PropTypes.func.isRequired
};

Streetwalker.defaultProps = {
	data: []
};

const streetwalkerResultDefaultSyle = {
	width: '100%',
	maxWidth: '100%'
};

// Menu and result component
export class StreetwalkerResults extends Component {
	constructor() {
		super();

		this.handleClose = this.handleClose.bind(this);
	}

	buildFunctions(actions, item) {
		return actions.map((action, key) => {
			return (
				<MenuItem
					style={this.props.menuItemStyle}
					key={action.label}
					insetChildren
					primaryText={action.label || 'missing label property'}
					onClick={this.handleExternalFunction.bind(this, {fn: action.action, item: item})}
					leftIcon={action.icon}
				/>
			);
		});
	}

	menuItemBuilder(item, key, plugin) {
		let other = {};
		if (plugin.actions) {
			other = {
				rightIcon: <MoreIcon/>,
				menuItems: this.buildFunctions(plugin.actions, item)
			};
		}
		if (item.icon) {
			other = {
				...other,
				leftIcon: item.icon
			};
		}
		return (
			<MenuItem
				{...other}
				insetChildren
				style={this.props.menuItemStyle}
				key={`MenuItem_${plugin.plugin}_${key}`}
				primaryText={item.label || 'missing label property'}
			/>
		);
	}

	renderMenuItems() {
		return this.props.data.map((plugin, catKey) => {
			let output;
			if (plugin.component) {
				// for this plugin is component
				output = [
					<MenuItem
						insetChildren
						style={this.props.menuItemStyle}
						children={plugin.component}
					/>,
					catKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			} else if (plugin.items.length > 1) {
				// menu of items, on each few functions are avaible
				output = [
					...plugin.items.map((item, key) => this.menuItemBuilder(item, key, plugin)),
					catKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			} else {
				// only one item
				output = [
					...plugin.actions.map((action, key) => {
						return (
							<MenuItem
								style={this.props.menuItemStyle}
								leftIcon={plugin.items[0].icon}
								key={`MenuItem_${plugin.plugin}_${key}`}
								insetChildren
								primaryText={`${plugin.items[0].label} - ${action.label}` || 'missing label property'}
								onClick={this.handleExternalFunction.bind(this, {fn: action.action, item: plugin.items[0]})}
							/>
						);
					}),
					catKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			}
			return output;
		});
	}

	handleClose() {
		setTimeout(() => {
			this.props.onClose();
		}, 0);
	}

	handleExternalFunction(action, event) {
		event.preventDefault();
		if (this.props.externalFunction) {
			this.props.externalFunction(action);
		} else {
			action.fn(action.item);
		}
		this.handleClose();
	}

	render() {
		if (this.props.showMenu && this.props.data) {
			return (
				<ClickAwayListener onClickAway={this.handleClose}>
				<Paper zDepth={2} style={this.props.paperStyle || streetwalkerResultDefaultSyle}>

					<Menu
						{...this.props.menuProps}
						ref="menu"
						style={this.props.menuStyle || streetwalkerResultDefaultSyle}
						listStyle={this.props.menuStyle}
						listStyle={{
							width: '100%'
						}}
						desktop={true}
						initiallyKeyboardFocused={true}
						onEscKeyDown={this.handleClose}
					>{this.renderMenuItems()}
					</Menu>

				</Paper>
				</ClickAwayListener>
			);
		}
		return null;
	}
}

StreetwalkerResults.propTypes = {
	data: PropTypes.array,
	menuProps: PropTypes.object,
	menuStyle: PropTypes.object,
	menuItemStyle: PropTypes.object,
	paperStyle: PropTypes.object,
	showMenu: PropTypes.bool,
	onClose: PropTypes.func,
	externalFunction: PropTypes.func
};

StreetwalkerResults.defaultProps = {
	data: [],
	showMenu: false,
	onClose: () => {}
};
