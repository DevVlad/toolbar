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
		label: 'primAction1',
		icon: <Home hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href: '/Demo1',
		label: 'primAction1',
		icon: <Left hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		href: '/Demo2',
		label: 'primAction1',
		icon: <Right hoverColor={blue500}/>,
		disabled: false,
		priority: 1
	}, {
		onAction: () => {console.log('action1')},
		label: 'primAction1',
		icon: <NavigationClose hoverColor={red500}/>,
		disabled: false,
		priority: 2
	}, {
		onAction: () => {console.log('action2')},
		label: 'primAction2',
		disabled: true,
		priority: 2
	}, {
		onAction: () => {console.log('action3')},
		label: 'primAction3',
		icon: <Edit hoverColor={blue500}/>,
		disabled: false,
		priority: 3
	}
];

export const secondaryFunctions = [
	{
		onAction: () => {console.log('action4')},
		label: 'secAction1',
		disabled: false,
		priority: 3
	}, {
		onAction: () => {console.log('action5')},
		label: 'secAction2',
		icon: <Comment hoverColor={blue500}/>,
		disabled: true,
		priority: 2
	}, {
		onAction: () => {console.log('action1')},
		label: 'primAction1',
		icon: <NavigationClose hoverColor={red500}/>,
		disabled: false,
		priority: 3
	}, {
		onAction: () => {console.log('action6')},
		label: 'secAction3',
		icon: <MoreVertIcon hoverColor={blue500}/>,
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
		href:'Demo2',
		label: 'Demo2 link',
		disabled: false,
		priority: 1
	}
];
