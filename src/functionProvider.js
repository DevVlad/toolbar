import React from 'react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Comment from 'material-ui/svg-icons/editor/insert-comment';
import Home from 'material-ui/svg-icons/action/home';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';

import { blue500, red500 } from 'material-ui/styles/colors';

export const primaryFunctions = [
	{
		href: '/',
		label: 'Home',
		icon: <Home hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href: '/Demo1',
		label: 'Demo1 link',
		icon: <Left hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href: '/Demo2',
		label: 'Demo2 link',
		icon: <Right hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		onAction: () => {console.log('ClosePrim')},
		label: 'ClosePrim',
		icon: <NavigationClose hoverColor={red500}/>,
		disabled: false,
		priority: 2
	}, {
		onAction: () => {console.log('ButtonPrim1')},
		label: 'ButtonPrim1',
		disabled: true,
		priority: 2
	}, {
		onAction: () => {console.log('EditPrim')},
		label: 'EditPrim',
		icon: <Edit hoverColor={blue500}/>,
		disabled: false,
		priority: 3
	}
];

export const secondaryFunctions = [
	{
		onAction: () => {console.log('ButtonSec1')},
		label: 'ButtonSec1',
		disabled: false,
		priority: 3
	}, {
		onAction: () => {console.log('CommentSec')},
		label: 'CommentSec',
		icon: <Comment hoverColor={blue500}/>,
		disabled: true,
		priority: 2
	}, {
		onAction: () => {console.log('CloseSec')},
		label: 'CloseSec',
		icon: <NavigationClose hoverColor={red500}/>,
		disabled: false,
		priority: 3
	}, {
		onAction: () => {console.log('MoreSec')},
		label: 'MoreSec',
		icon: <MoreVertIcon hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href:'/appbar',
		label: 'AppbarLink',
		disabled: false,
		priority: 1
	}
];

export const hiddenFunctions = [
	{
		href: '/Demo1',
		label: 'Demo1 link',
		icon: <Left hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href:'/Demo2',
		label: 'Demo2 link',
		disabled: false,
		priority: 1
	}
];
