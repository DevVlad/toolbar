import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
					iconElementRight={<IconButton><MoreVertIcon /></IconButton>}
				/>
				<h4 style={{textAlign: 'center'}}>AppBar Route</h4>
			</Paper>
		);
	}
}

export default Demo1;
