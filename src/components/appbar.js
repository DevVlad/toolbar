import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import { primaryFunctions, secondaryFunctions } from '../functionProvider.js';

const style = {
  height: '80%',
  width: '80%',
  margin: 20,
  display: 'inline-block',
};

class Demo1 extends Component {
	render() {
		return (
			<Paper style={style} zDepth={2}>
				<AppBar
					title="AppBar example"

				/>
				<h4>AppBar Route</h4>
			</Paper>
		);
	}
}

export default Demo1;
