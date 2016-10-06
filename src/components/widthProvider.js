import { Component, PropTypes } from 'react';
import sizeMe from 'react-sizeme';

class WidthProvider extends Component {
	static propTypes = {
		width: PropTypes.func.isRequired
	};

	static defaultProps = {
		width: () => {}
	};

	componentWillReceiveProps(nextProps) {
		nextProps.width(nextProps.size.width);
	}

	render() {
		return this.props.children;
	}
}

export default sizeMe()(WidthProvider);
