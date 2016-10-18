import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';

const defaultStyle = {
	input: {
		width: '75%',
		display: 'inline-block',
		zIndex: 90
	}
};

class Streetwalker extends Component {
	constructor(props) {
		super(props);

		this.handleSearchText = this.handleSearchText.bind(this);

		this.state = {
			inputStyle: {
				...defaultStyle.input,
				...props.inputStyle
			},
			placeholder: props.placeHolder || 'Search',
			isMenu: false
		};
	}

	handleSearchText = (e) =>	this.props.onChange(e.target.value);

	renderMenuItems() {
		console.log(this.props.data);
		return this.props.data.map((type, catKey) => {
			return (
				<Paper key={catKey} zDepth={1}>
					{type.items.map((item, key) => <h4 key={key}>{item}</h4>)}
				</Paper>
			);
		})
	}

	getMenu() {
		if (this.props.data) {
			return (
				<Paper
					tabIndex={-1}
					zDepth={2}
					style={{
						...defaultStyle.input,
						maxHeight: '450px',
						height: '350px'
					}}
				> {this.renderMenuItems()}
				</Paper>
			);
		}
		return null;
	}

	render() {
		console.log(this.props.data);
		return (
			<div style={this.state.inputStyle}>
				<input
					ref="input"
					className="form-control"
					style={this.state.inputStyle}
					type="text"
					placeholder="Search"
					onChange={this.handleSearchText}
					value={this.props.value || ''}
					/>
					{this.getMenu()}
				</div>
		);
	}
}

export default Streetwalker;

Streetwalker.propTypes = {
	data: PropTypes.array,
	value: PropTypes.string,
	inputStyle: PropTypes.object,
	placeHolder: PropTypes.string,
	onChange: PropTypes.func.isRequired
}
