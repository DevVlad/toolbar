import React from 'react';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import { blue500 } from 'material-ui/styles/colors';
import Demo1 from './components/demo1.js';

export const streetwalkerData = [
	{
		plugin: 'Firmy',
		items: [{label: 'Firma B', icon: <MapsPlace hoverColor={blue500}/>}],
		actions: [
			{
				label: 'Add new',
				action: (x) => x.label
			}, {
				label: 'Edit',
				action: (x) => x.label
			}, {
				label: 'Show',
				action: (x) => x.label
			},
		]
	}, {
		plugin: 'Faktury',
		items: [{label: 'f001'}, {label: 'f002'}, {label: 'f003'}, {label: 'f004'}, {label: 'f005'}],
		actions: [
			{
				label: 'Edit',
				icon: <Edit hoverColor={blue500}/>,
				action: (x) => x.label
			}, {
				label: 'Show',
				action: (x) => x.label
			}, {
				label: 'Delete',
				action: (x) => x.label
			}
		]
	}, {
		plugin: 'Test_Component',
		component: <Demo1 />
	}
];