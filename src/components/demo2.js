import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from './toolbar.js';

import { primaryFunctions, secondaryFunctions } from '../functionProvider.js';
import { streetwalkerData } from '../testData.js';
import { StreetwalkerResults } from './streetwalker.js';

const style = {
  height: '80%',
  width: '80%',
  margin: 20,
  display: 'inline-block',
};

class Demo2 extends Component {
	render() {
		return (
			<Paper style={style} zDepth={2}>
				<Toolbar
					title="Toolbar example"
					primaryFunctions={primaryFunctions}
					secondaryFunctions={secondaryFunctions}
					priorityBreakpoint={2}
				/>
				<h4 style={{textAlign: 'center'}}>Demo2 Route</h4>
				<p>&nbsp;</p>
				<StreetwalkerResults
					data={streetwalkerData}
				/>
			</Paper>
		);
	}
}

export default Demo2;
