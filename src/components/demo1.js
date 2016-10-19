import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from './toolbar.js';

import { primaryFunctions, secondaryFunctions } from '../functionProvider.js';

const style = {
  height: '80%',
  width: '80%',
  margin: 20,
  display: 'inline-block',
	textAlign: 'center'
};

class Demo1 extends Component {
	render() {
		return (
			<Paper style={style} zDepth={2}>
				<Toolbar
					title="Toolbar example"
					primaryFunctions={primaryFunctions}
					secondaryFunctions={[]}
					// secondaryFunctions={secondaryFunctions}
					priorityBreakpoint={1}
				/>
				<h4>Demo1 Route</h4>
			</Paper>
		);
	}
}

export default Demo1;
