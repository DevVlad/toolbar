import React, { Component, PropTypes } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { blue500 } from 'material-ui/styles/colors';
import WidthProvider from './widthProvider.js';

class MaterialToolbar extends Component {
	static propTypes = {
		title: PropTypes.string,
		primaryFunctions: PropTypes.array,
		secondaryFunctions: PropTypes.array,
		parentWidth: PropTypes.number
	};

	constructor(props) {
		super(props);

		this.widthCounter = 0;
		this.state = {
			primActions: this.getFuncToToolbar(props.primaryFunctions),
			secActions: this.getFuncToToolbar(props.secondaryFunctions),
			shouldEnableMenu: true,
			enoughSpace: true
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (!nextState.enoughSpace) {
			console.log('Preskladani ikon', nextState);
		}
	}

	getFuncToToolbar(funcArr) {
		return funcArr.sort((x, y) => {
			if (x.priority > y.priority) {
				return 1;
			}
			if (x.priority < y.priority) {
				return -1;
			}
			return 0;
		}).map((func, key) => {
			if (func.icon) {
				return (
					<IconButton
						key={key}
						onClick={func.onAction}
						disabled={func.disabled}
						>{func.icon}
					</IconButton>
				);
			} else if (func.label) {
				return (
					<RaisedButton
						key={key}
						label={func.label}
						primary={true}
						onClick={func.onAction}
						style={{margin: 12}} />
				);
			} else {
				console.error('Wrong inserted function to Toolbar: ', func);
			}
		});
	}

	renderMenu() {
		// TODO: ve statu bude hiddenFunctions = [] a to pujde jako ItemList
		return <MenuItem primaryText="Sem prijdou fce kdyz je to male" />;
	}

	shouldEnableMenu() {
		if (this.state.shouldEnableMenu) {
			return (
				<IconMenu
					iconButtonElement={
						<IconButton touch={true}>
							<NavigationExpandMoreIcon hoverColor={blue500}/>
						</IconButton>
					}
				>{this.renderMenu()}
				</IconMenu>
			);
		} else {
			return null;
		}
	}

	calcRestWidth() {
		const { primWidth, titleWidth, secWidth } = this.state;
		if (primWidth && titleWidth && secWidth) {
			const restWidth = this.props.parentWidth - (primWidth + titleWidth + secWidth);
			this.setState({enoughSpace: restWidth >= 0});
		}
	}

	setIn(where, width) {
		setTimeout(() => {
			if (!this.state[where] || this.state[where] !== width) {
				this.setState({[where]: width});
				this.calcRestWidth();
			}
		}, 0);
	}

	render() {
		console.log('Toolbar render', this.props, this.state);

		return (
			<Toolbar>
				<WidthProvider width={(width) => this.setIn('primWidth', width)}>
					<ToolbarGroup firstChild={true}>
						{this.state.primActions}
					</ToolbarGroup>
				</WidthProvider>

				<WidthProvider width={(width) => this.setIn('titleWidth', width)}>
					<ToolbarGroup>
						<ToolbarTitle text={this.props.title} />
					</ToolbarGroup>
				</WidthProvider>

				<WidthProvider width={(width) => this.setIn('secWidth', width)}>
					<ToolbarGroup lastChild={true}>
						{this.state.secActions}
						{this.shouldEnableMenu()}
					</ToolbarGroup>
				</WidthProvider>
			</Toolbar>
		);
	}
};

export default MaterialToolbar;
