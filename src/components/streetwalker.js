import React, { Component, PropTypes } from 'react';
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
		this.handleExternalFunction = this.handleExternalFunction.bind(this);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleMenuCloseRequest = this.handleMenuCloseRequest.bind(this);

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
			showMenu: props.data.length !== 0 ? true : false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length !== 0 && !this.state.showMenu && !this.state.taskComplete) {
			this.openMenu();
		}
		this.focusInput();
	}

	handleMenuCloseRequest() {
		// StreetwalkerResults ask for close
		console.log('close req');
		this.closeMenu();
	}

	closeMenu(param = {}) {
		this.setState({
			showMenu: false,
			taskComplete: true,
			...param
		});
		this.focusInput();
	}

	openMenu(param = {}, focus) {
		this.setState({
			showMenu: true,
			...param
		});
	}

	focusInput() {
		setTimeout(() => {
			this.refs.input.focus();
		}, 0);
	}

	handleExternalFunction(action, param) {
		// menuItem action
		this.props.onChange(action.fn(action.item));
		this.closeMenu(param);
	}

	handleSearchText(event) {
		this.props.onChange(event.target.value);
		this.focusInput();
	}

	handleInputClick() {
		if (this.props.data.length !== 0) {
			this.state.showMenu ? this.closeMenu() : this.openMenu();
		}
	}

	handleKeyDown(event) {
		// handle arrow-up
		if (event.keyCode === 38) {
			this.closeMenu();
		}
		// handle arrow-down
		if (event.keyCode === 40) {
			this.openMenu({taskComplete: false}, 'focus');
		}
		// handle ESC
		if (event.keyCode === 27) {
			this.closeMenu();
			this.focusInput();
		}
	}

	getMenu() {
		if (this.props.value && this.props.data && this.state.showMenu) {
			return (
				<StreetwalkerResults
					data={this.props.data}
					menuStyle={this.state.styles.menuStyle}
					paperStyle={this.state.styles.paperStyle}
					menuItemStyle={this.state.styles.menuItemStyle}
					menuProps={this.props.menuProps}
					onClose={this.handleMenuCloseRequest}
					showMenu={this.state.showMenu}
					onChange={this.handleExternalFunction}
				/>
			);
		}
		return null;
	}

	render() {
		return (
			<ClickAwayListener onClickAway={() => this.closeMenu()}>
			<div style={this.props.style}>
				<SearchIcon
					style={{
						position: 'absolute',
						transform: 'translate(5px, 8px)',
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
					onClick={this.handleInputClick}
				/>
					{this.getMenu()}
			</div>
			</ClickAwayListener>
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

const getItems = (data) => {
	return [].concat(...data.map(plugin => {
		if (plugin.component) {
			return `MenuItem_${plugin.plugin}_component`;
		} else {
			if (plugin.items.length === 1) {
				return plugin.actions.map((action, key) => `MenuItem_${plugin.plugin}_${key}`);
			} else {
				return plugin.items.map((item, key) => `MenuItem_${plugin.plugin}_${key}`);
			}
		}
	}));
};

// Menu and result component
export class StreetwalkerResults extends Component {
	constructor(props) {
		super(props);

		this.askForClose = this.askForClose.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		const items = getItems(props.data);
		this.state = {
			plugins: props.data.length !== 0 ? props.data.map(plugin => plugin.plugin) : [],
			focusedItemIndex: 0,
			focusedItem: items[0],
			items: items
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length !== 0) {
			this.setState({
				plugins: nextProps.data.map(plugin => plugin.plugin),
				items: getItems(nextProps.data)
			});
		}
	}

	buildFunctions(actions, item, plugin) {
		return actions.map((action, key) => {
			const keyToPass = `MenuItem_${plugin.plugin}_${key}`;
			return (
				<MenuItem
					focusState={this.state.focusedItem === keyToPass ? "keyboard-focused" : "none"}
					style={this.props.menuItemStyle}
					key={keyToPass}
					insetChildren
					primaryText={action.label || 'missing label property'}
					onTouchTap={this.handleOnChange.bind(this, {fn: action.action, item: item})}
					leftIcon={action.icon}
				/>
			);
		});
	}

	menuItemBuilder(item, key, plugin) {
		let menuItemProps = {};
		if (plugin.actions) {
			menuItemProps = {
				rightIcon: <MoreIcon/>,
				menuItems: this.buildFunctions(plugin.actions, item, plugin)
			};
		}
		if (item.icon) {
			menuItemProps = {
				...menuItemProps,
				leftIcon: item.icon
			};
		}
		const keyToPass = `MenuItem_${plugin.plugin}_${key}`;
		return (
			<MenuItem
				{...menuItemProps}
				focusState={this.state.focusedItem === keyToPass ? "keyboard-focused" : "none"}
				insetChildren
				style={this.props.menuItemStyle}
				key={keyToPass}
				primaryText={item.label || 'missing label property'}
			/>
		);
	}

	renderMenuItems() {
		return this.props.data.map((plugin, pluginKey) => {
			let menuContent;
			if (plugin.component) {
				// for this plugin is component
				const keyToPass = `MenuItem_${plugin.plugin}_component`;
				menuContent = [
					<MenuItem
						focusState={this.state.focusedItem === keyToPass ? "keyboard-focused" : "none"}
						key={keyToPass}
						insetChildren
						style={this.props.menuItemStyle}
						children={plugin.component}
					/>,
					pluginKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			} else if (plugin.items.length > 1) {
				// menu of items, on each few functions are avaible
				menuContent = [
					...plugin.items.map((item, key) => this.menuItemBuilder(item, key, plugin)),
					pluginKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			} else {
				// only one item
				menuContent = [
					...plugin.actions.map((action, key) => {
						const keyToPass = `MenuItem_${plugin.plugin}_${key}`;
						return (
							<MenuItem
								focusState={this.state.focusedItem === keyToPass ? "keyboard-focused" : "none"}
								style={this.props.menuItemStyle}
								leftIcon={plugin.items[0].icon}
								key={keyToPass}
								insetChildren
								primaryText={`${plugin.items[0].label} - ${action.label}` || 'missing label property'}
								onTouchTap={this.handleOnChange.bind(this, {fn: action.action, item: plugin.items[0]})}
							/>
						);
					}),
					pluginKey !== this.props.data.length - 1 ? <Divider style={this.props.menuItemStyle}/> : null
				];
			}
			return menuContent;
		});
	}

	askForClose() {
		this.props.onClose();
	}

	handleOnChange(action) {
		if (this.props.onChange) {
			this.props.onChange(action);
		} else {
			action.fn(action.item);
		}
		// this.askForClose();
	}

	handleItemFocus(action) {
		let { focusedItem, focusedItemIndex, items } = this.state;
		switch(action) {
			case 'increment':
				if (focusedItemIndex === items.length - 1) {
					focusedItemIndex = 0;
					focusedItem = items[0];
				} else {
					focusedItemIndex += 1;
					focusedItem = items[focusedItemIndex];
				}
				break;
			case 'decrement':
				if (focusedItemIndex === 0) {
					focusedItemIndex = items.length - 1;
					focusedItem = items[focusedItemIndex];
				} else {
					focusedItemIndex -= 1;
					focusedItem = items[focusedItemIndex];
				}
				break;
		}
		this.setState({focusedItemIndex, focusedItem});
	}

	handleKeyDown(event) {
		event.stopPropagation();
		if (event.keyCode === 27) {
			// handle ESC
			this.askForClose();
		} else if (event.keyCode === 38) {
			// handle arrow-up
			this.handleItemFocus('decrement');
		} else if (event.keyCode === 40) {
			// handle arrow-down
			this.handleItemFocus('increment');
		}
	}

	render() {
		console.log('StreetwalkerResults RENDER', this.state.focusedItem);
		if (this.props.data) {
			return (
				<Paper zDepth={2} style={this.props.paperStyle || streetwalkerResultDefaultSyle}>
					<Menu
						{...this.props.menuProps}
						style={this.props.menuStyle || streetwalkerResultDefaultSyle}
						listStyle={this.props.menuStyle}
						desktop={true}
						initiallyKeyboardFocused={true}
						onEscKeyDown={this.askForClose}
						onKeyDown={this.handleKeyDown}
					>{this.renderMenuItems()}
					</Menu>
				</Paper>
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
	onClose: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func
};

StreetwalkerResults.defaultProps = {
	data: [],
	onClose: () => {}
};
