import React from 'react';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import { blue500 } from 'material-ui/styles/colors';
import Paper from './components/paper.js';

export const assistantData = [
	{
		plugin: 'Firmy',
		items: [{label: 'Firma B', icon: <MapsPlace hoverColor={blue500}/>}],
		actions: [
			{
				label: 'Add new',
				action: (x) => `Add_new_${x.label}`
			}, {
				label: 'Edit',
				action: (x) => `Edit_${x.label}`
			}, {
				label: 'Show',
				action: (x) => `Show_${x.label}`
			},
		]
	}, {
		plugin: 'Faktury',
		items: [{label: 'f001'}, {label: 'f002'}, {label: 'f003'}, {label: 'f004'}, {label: 'f005'}],
		actions: [
			{
				label: 'Edit',
				icon: <Edit hoverColor={blue500}/>,
				action: (x) => `Edit_${x.label}`
			}, {
				label: 'Show',
				action: (x) => `Show_${x.label}`
			}, {
				label: 'Delete',
				action: (x) => `Delete_${x.label}`
			}
		]
	}, {
		plugin: 'Test_Component',
		component: <div>ahoj</div>//<Paper children={[<h2 key="example">Example component</h2>]}/>
	}
];
