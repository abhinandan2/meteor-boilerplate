import React from 'react';
import PropTypes from 'prop-types';


const PrivateHeader = (props) => {
	const renderSub = () => {
		if(props.subtitle)
			return <h4 className="title-bar__subtitle">{props.subtitle}</h4>;
	}
	return (
		<div className="title-bar">
			<div className="title-bar__content">
				<h1 className="title-bar__title">{props.title}</h1>
				{renderSub()}
				<button onClick={ () => Accounts.logout() }  className="button--link-text">Logout</button>
			</div>
		</div>
	)
} 

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
}

export default PrivateHeader;