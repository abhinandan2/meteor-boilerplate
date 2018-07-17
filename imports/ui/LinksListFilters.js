import {Meteor} from 'meteor/meteor'
import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showVisible: false,
		}
	}

	componentDidMount(){
		this.chkTracker = Tracker.autorun(() => {
			this.setState({
				showVisible: Session.get('showVisible')
			});
		});
	}

	componentWillUnmount(){
		this.chkTracker.stop();
	}

	render(){
		return (
			<div>
				<label className='checkbox'>
					<input className='checkbox__box'
					  ref='chkbx'
					  type="checkbox"
					  checked={!this.state.showVisible} 
					  onChange={(e) => { Session.set('showVisible', !e.target.checked) }}/>
					Show hidden link
				</label>
			</div>
		);
	}
}

