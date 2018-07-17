import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import LinksListItem from './LinksListItem'

export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: [],
		};
	}
	
	componentDidMount() { 
		console.log('componentDidMount');
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('linksPub');
			const links = Links.find({
				visible: Session.get('showVisible')
			}).fetch();
			this.setState({ links });
		});
	};

	componentWillUnmount() {
		console.log('componentWillUnmount');
		this.linksTracker.stop();
	};

	// Renderer
	renderLinksListItems(){
		if(this.state.links.length === 0){
			return (
				<div className="item">
					<div className="item__status-message">
						<p>No Links Found</p>
					</div>
				</div>
			)
		};

		return this.state.links.map((link) => {
			const shortUrl = Meteor.absoluteUrl(link._id);
			return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
		});
	}

	render() {
		return (
				<div>
					<div>
					 	<FlipMove 
					 		staggerDelayBy='60'
					 		maintainContainerHeight={true}
					 	>
							{this.renderLinksListItems()}
						</FlipMove>
					</div>
				</div>
			)
	}
}