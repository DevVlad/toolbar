import { Component, PropTypes } from 'react';
import sizeMe from 'react-sizeme';

class WidthProvider extends Component {
	static propTypes = {
		width: PropTypes.func
	};

	static defaultProps = {
		width: () => {}
	};

	render() {
		if (this.props.children.length > 0) {
			this.props.width(this.props.size.width);
		}
		return this.props.children;
	}
}

export default sizeMe()(WidthProvider);
