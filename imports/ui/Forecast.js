import React from 'react';

export default class Forecast extends React.Component {
	render(){
		return (
			<div>
				<p>{this.props.locationKey}</p>
			</div>

			)
	}
}