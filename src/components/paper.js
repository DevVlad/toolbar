import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import sizeMe from 'react-sizeme';

const style = {
  height: '80%',
  width: '80%',
  margin: 20,
  display: 'inline-block',
};

class MyPaper extends Component {
	render() {
		return (
			<Paper style={style} zDepth={2}>
				{this.props.children.map((child, key) => {
					if (child.props.enableListeningToParentWidth) {
						return React.cloneElement(child, {parentWidth: this.props.size.width, key});
					} else {
						return child;
					}
				})}
			</Paper>
		);
	}
}

export default sizeMe()(MyPaper);
