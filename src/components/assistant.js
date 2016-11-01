import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SizeMe from 'react-sizeme';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import MoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey500, blue100 } from 'material-ui/styles/colors';

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
		overflowX: 'hidden',
		width: '100%',
		maxWidth: '100%'
	},
	menu: {
		width: '100%',
		maxWidth: '100%',
		textAlign: 'left'
	},
	menuItem: {
		maxWidth: '100%'
	}
};

class Assistant extends Component {
	constructor(props) {
		super(props);

		this.handleSearchText = this.handleSearchText.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleInternalFunc = this.handleInternalFunc.bind(this);
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

	componentDidMount() {
		// setting of anchorEl, otherwise popover will render somewhere else
		this.setState({anchorEl: ReactDOM.findDOMNode(this.refs.input)});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length !== 0 && !this.state.showMenu) {
			this.openMenu();
		}
	}

	componentWillUnmount() {
		// because of rounting
		// change of route -> unmounting, but there could be pending req to menuClose
		if (this.closeMenuTimer) {
			clearTimeout(this.closeMenuTimer);
		}
	}

	handleMenuCloseRequest() {
		// AssistantResults ask for close
		if (this.state.showMenu) {
			this.closeMenu();
		}
	}

	closeMenu(param = {}) {
		this.closeMenuTimer = setTimeout(() => {
			this.setState({
				showMenu: false,
				anchorEl: null,
				...param
			});
		}, 0);
	}

	openMenu(param = {}) {
		this.setState({
			showMenu: true,
			anchorEl: ReactDOM.findDOMNode(this.refs.input),
			...param
		});
	}

	focusInput() {
		setTimeout(() => {
			if (this.refs.input) {
				this.refs.input.focus();
			}
		}, 0);
	}

	handleInternalFunc(action, param) {
		// menuItem submit function
		if (this.props.handleInternalFunc) {
			this.props.handleInternalFunc(action);
		} else {
			action.fn(action.item);
			if (this.state.showMenu) this.closeMenu();
		}
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
			this.openMenu();
		}
		// handle ESC
		if (event.keyCode === 27) {
			this.closeMenu();
			this.focusInput();
		}
	}

	getMenu(popoverStyle) {
		if (this.props.data && this.state.showMenu) {
			return (
				<AssistantResults
					data={this.props.data}
					menuStyle={{...this.state.styles.menuStyle, ...popoverStyle}}
					paperStyle={{...this.state.styles.paperStyle, ...popoverStyle}}
					menuItemStyle={{...this.state.styles.menuItemStyle, ...popoverStyle}}
					menuProps={this.props.menuProps}
					onClose={this.handleMenuCloseRequest}
					showMenu={this.state.showMenu}
					onChange={this.handleInternalFunc}
				/>
			);
		}
		return null;
	}

	render() {
		// Assistant component has 70% of parrent width, just because I like it (:
		const popoverStyle = {
			width: 0.7 * this.props.size.width,
			maxWidth: 0.7 * this.props.size.width
		};

		return (
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
				<Popover
					style={{...this.state.styles.menuStyle, ...popoverStyle}}
					canAutoPosition={false}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={this.state.showMenu}
					anchorEl={this.state.anchorEl}
					useLayerForClickAway={false}
					onRequestClose={this.handleMenuCloseRequest}
					animated={false}
				>{this.getMenu(popoverStyle)}
				</Popover>
			</div>
		);
	}
}

export default SizeMe()(Assistant);

Assistant.propTypes = {
	data: PropTypes.array.isRequired,
	value: PropTypes.string,
	style: PropTypes.object,
	inputStyle: PropTypes.object,
	menuStyle: PropTypes.object,
	paperStyle: PropTypes.object,
	placeHolder: PropTypes.string,
	menuProps: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	size: PropTypes.object.isRequired,
	handleInternalFunc: PropTypes.func
};

Assistant.defaultProps = {
	data: []
};

const assistantResultsDefaultSyle = {
	width: '100%',
	maxWidth: '100%'
};

const getItemKey = (plugin, key) => `MenuItem_${plugin.plugin}_${key}`;

const getItems = (data) => {
	return [].concat(...data.map(plugin => {
		if (plugin.component) {
			return getItemKey(plugin, 'component');
		} else {
			if (plugin.items && plugin.items.length !== 0 && plugin.items.length === 1) {
				if (plugin.actions) {
					return plugin.actions.map((action, key) => getItemKey(plugin, key));
				}
				return getItemKey(plugin, '0');
			} else if (plugin.items && plugin.items.length !== 0) {
				return plugin.items.map((item, key) => getItemKey(plugin, key));
			}
		}
	}));
};

// Menu and result component
export class AssistantResults extends Component {
	constructor(props) {
		super(props);

		this.askForClose = this.askForClose.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		const items = getItems(props.data);
		this.state = {
			plugins: props.data.length !== 0 ? props.data.map(plugin => plugin.plugin) : [],
			focusedItemIndex: props.focusedItemIndex || 0,
			focusedItem: items[props.focusedItemIndex] || items[0],
			items: items
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length !== 0 && this.props.showMenu) {
			this.setState({
				plugins: nextProps.data.map(plugin => plugin.plugin),
				items: getItems(nextProps.data),
				anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField)
			});
		}
	}

	getSeparator(isNeeded) {
		return isNeeded ? <Divider style={this.props.menuItemStyle}/> : null;
	}

	menuItemsFactory(keyToPass, plugin) {
		const selectedStyle = this.state.focusedItem === keyToPass ? {
			innerDivStyle: {
				backgroundColor: blue100,
				color: "white"
			}
		} : {};
		const menuItemProps = {
			key: keyToPass,
			value: keyToPass,
			insetChildren: true,
			style: this.props.menuItemStyle,
			children: plugin.component || null,
			focusState: this.state.focusedItem === keyToPass ? "focused" : "none",
			...selectedStyle
		};
		return <MenuItem {...menuItemProps}/>;
	}

	functionsFactory(actions, item, plugin) {
		return actions.map((action, key) => {
			const keyToPass = getItemKey(plugin, key + '_function');
			return (
				React.cloneElement(this.menuItemsFactory(keyToPass, plugin), {
					primaryText: action.label || 'missing label property',
					leftIcon: action.icon || null,
					onTouchTap: this.handleOnChange.bind(this, {fn: action.action, item: item})
				})
			);
		});
	}

	menuItemBuilder(item, key, plugin) {
		let menuItemProps = {};
		if (plugin.actions && !item.action) {
			menuItemProps = {
				rightIcon: <MoreIcon/>,
				menuItems: this.functionsFactory(plugin.actions, item, plugin)
			};
		}
		if (item.icon) {
			menuItemProps = {
				...menuItemProps,
				leftIcon: item.icon
			};
		}
		if (item.action) {
			menuItemProps = {
				...menuItemProps,
				onTouchTap: this.handleOnChange.bind(this, {fn: item.action, item: item}) //item.action
			};
		}
		const keyToPass = getItemKey(plugin, key);
		return (
			React.cloneElement(this.menuItemsFactory(keyToPass, plugin), {
				...menuItemProps,
				primaryText: item.label || 'missing label property'
			})
		);
	}

	renderMenuItems() {
		return this.props.data.map((plugin, pluginKey) => {
			let menuContent;
			if (plugin.component) {
				// component for this plugin
				const keyToPass = getItemKey(plugin, 'component');
				menuContent = [
					this.menuItemsFactory(keyToPass, plugin),
					this.getSeparator(pluginKey !== this.props.data.length - 1)
				];
			} else if (plugin.items && plugin.items.length === 1) {
				// only one item
				if (plugin.actions) {
					menuContent = [
						...plugin.actions.map((action, key) => {
							const keyToPass = getItemKey(plugin, key);
							return (
								React.cloneElement(this.menuItemsFactory(keyToPass, plugin), {
									leftIcon: plugin.items[0].icon || null,
									primaryText: `${plugin.items[0].label} - ${action.label}` || 'missing label property',
									onTouchTap: this.handleOnChange.bind(this, {fn: action.action, item: plugin.items[0]})
								})
							);
						}),
						this.getSeparator(pluginKey !== this.props.data.length - 1)
					];
				} else if (plugin.items) {
					const keyToPass = getItemKey(plugin, '0');
					menuContent = plugin.items[0] ? [
						React.cloneElement(this.menuItemsFactory(keyToPass, plugin), {
							leftIcon: plugin.items[0] ? plugin.items[0].icon : null,
							primaryText: `${plugin.items[0].label} - ${plugin.items[0].label}` || 'missing label property',
							onTouchTap: this.handleOnChange.bind(this, {fn: plugin.items[0].action, item: plugin.items[0]})//plugin.items[0].action
						}),
						this.getSeparator(pluginKey !== this.props.data.length - 1)
					] : null;
				}
			} else if (plugin.items) {
				// menu of items, on each few functions are avaible
				menuContent = [
					...plugin.items.map((item, key) => this.menuItemBuilder(item, key, plugin)),
					this.getSeparator(pluginKey !== this.props.data.length - 1)
				];
			}
			return menuContent;
		});
	}

	askForClose() {
		this.props.onClose();
	}

	handleOnChange(action, event) {
		action.fn(event);
		this.askForClose();
	}

	handleItemFocus(action) {
		let { focusedItem, focusedItemIndex, items } = this.state;
		console.log(this.MenuItem_Firmy_2);
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

	//	TODO: unable to pass prop focusState to MenuItem
	// 	https://github.com/callemall/material-ui/issues/5346
	// 	focus issues, for now skipped
	handleKeyDown(event) {
		event.preventDefault();
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
		if (this.props.data.length !== 0) {
			return (
				<Paper
					zDepth={2}
					style={this.props.paperStyle || assistantResultsDefaultSyle}
				>
					<Menu
						{...this.props.menuProps}
						tabIndex={-1}
						style={this.props.menuStyle || assistantResultsDefaultSyle}
						listStyle={this.props.menuStyle}
						desktop={true}
						multiple={false}
						// initiallyKeyboardFocused={false}
						// onEscKeyDown={this.askForClose}
						onKeyDown={this.handleKeyDown}
					>{this.renderMenuItems()}
					</Menu>
				</Paper>
			);
		}
		return null;
	}
}

AssistantResults.propTypes = {
	data: PropTypes.array.isRequired,
	menuProps: PropTypes.object,
	menuStyle: PropTypes.object,
	menuItemStyle: PropTypes.object,
	paperStyle: PropTypes.object,
	onClose: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	focusedItemIndex: PropTypes.number, // not avaible for now
	showMenu: PropTypes.bool
};

AssistantResults.defaultProps = {
	data: [],
	onClose: () => {},
	onChange: () => {}
};
