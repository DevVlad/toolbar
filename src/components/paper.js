import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import sizeMe from 'react-sizeme';

const style = {
	width: '80%',
	height: '800px',
	margin: 20,
	display: 'inline-block',
};

class MyPaper extends Component {
	renderChildren() {
		if (this.props.children) {
			return this.props.children.map((child, key) => {
				if (child.props.enableListeningToParentWidth) {
					return React.cloneElement(child, {parentWidth: this.props.size.width, key});
				} else {
					return child;
				}
			});
		} else {
			return <h1 style={{textAlign: 'center'}}>Something</h1>;
		}
	}
	render() {
		return (
			<Paper style={this.props.style || style} zDepth={2}>
				{this.renderChildren()}
			</Paper>
		);
	}
}

export default sizeMe()(MyPaper);
