import React, { Component, PropTypes } from 'react';
// import MaterialToolbar from './toolbar.js';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import { blue100 } from 'material-ui/styles/colors';
import Home from 'material-ui/svg-icons/action/home';

const centerStyles = {
	left: {
		position: 'absolute',
		top: '50%',
		marginLeft: '20px',
		transform: 'translate(-50%, -50%)'
	},
	right: {
		position: 'absolute',
		top: '50%',
		marginLeft: '-20px',
		transform: 'translate(-50%, -50%)'
	}
}

class Appbar extends Component {
	render() {
		return(
			<Toolbar style={{justifyContent: 'center', padding: '5px'}}>
				<ToolbarGroup style={{width: '33.3%', position: 'relative'}} firstChild>
					<Home style={{position: 'absolute', top: '50%', marginLeft: '20px', transform: 'translate(-50%, -50%)'}}/>
				</ToolbarGroup>
				<ToolbarTitle style={{width: '33.3%', position: 'relative'}} text={this.props.title} />
				<ToolbarGroup style={{width: '33.3%', position: 'relative'}} lastChild>
					{this.props.helper}
				</ToolbarGroup>
			</Toolbar>
			// <Toolbar style={this.props.toolbarStyle} >
			// 	<ToolbarGroup firstChild={true}>
			// 		<MenuItem primaryText={'here first'}/>
			// 	</ToolbarGroup>
			// 	<ToolbarGroup>
			// 		<ToolbarTitle style={this.props.titleStyle} text={this.props.title}/>
			// 	</ToolbarGroup>
			// 	<ToolbarGroup lastChild={true}>
			// 		{this.props.helper}
			// 	</ToolbarGroup>
			// </Toolbar>
		);
	}
}

export default Appbar;

// class MaterialAppBar extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			isHelperRequired: false
// 		};
// 	}
//
// 	getHelperIcon = () => (
// 		<IconButton onClick={() => {this.setState({isHelperRequired: !this.state.isHelperRequired})}}>
// 			<Search
// 				color="white"
// 				hoverColor={blue100}
// 				/>
// 		</IconButton>
// 	);
//
// 	getRightElems() {
// 		let helper;
// 		if (this.state.isHelperRequired && this.props.helper) {
// 			const helperNewProps = {
// 				style: {
// 					height: '60%',
// 					fontSize: '125%',
// 					marginTop: '8px'
// 				}
// 			}
// 			helper = React.cloneElement(this.props.helper, helperNewProps);
// 		}
// 		return helper ? [helper, this.getHelperIcon(), ...this.props.secondaryElements] : [this.getHelperIcon(), ...this.props.secondaryElements];
// 	}
//
// 	render() {
// 		const { helper, title, titleStyle, primaryElements, ...restProps } = this.props;
// 		const primElems = [...primaryElements, <ToolbarTitle style={titleStyle} text={title} />].map((elem, key) => {
// 			return React.cloneElement(elem, {key: `primaryElemetnt_${key}`});
// 		});
// 		const secElems = this.getRightElems().map((elem, key) => {
// 			return React.cloneElement(elem, {key: `secondaryElemetnt_${key}`});
// 		});
//
// 		return (
// 			<MaterialToolbar
// 				{...restProps}
// 				primaryElements={primElems}
// 				secondaryElements={secElems}
// 			/>
// 		);
// 	}
// }
//
// export default MaterialAppBar;
//
// MaterialAppBar.propTypes = {
// 	helperIconStyle: PropTypes.object,
// 	helper: PropTypes.object,
// 	primaryElements: PropTypes.array,
// 	secondaryElements: PropTypes.array,
// 	title: PropTypes.string,
// 	primaryFunctions: PropTypes.array,
// 	secondaryFunctions: PropTypes.array,
// 	hiddenFunctions: PropTypes.array,
// 	priorityBreakpoint: PropTypes.number,
// 	toolbarStyle: PropTypes.object,
// 	titleStyle: PropTypes.object
// };
//
// MaterialAppBar.defaultProps = {
// 	helperIconStyle: {},
// 	title: 'Title',
// 	primaryFunctions: [],
// 	secondaryFunctions: [],
// 	hiddenFunctions: [],
// 	primaryElements: [],
// 	secondaryElements: []
// };
