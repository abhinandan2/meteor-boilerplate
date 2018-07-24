import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Location } from '../api/location';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import { Session } from 'meteor/session';
import Weather from './Weather';

import { Form, InputGroup, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Col } from 'react-bootstrap';
export default class ChangeLocation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			state: '',
			locations: [],
			value: '',
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		// this.refs.locname.focus();
	}

  getValidationState() {
  	if(this.state.state) return this.state.state;
  	return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    Meteor.call('location.find', this.state.value, (err, res) => {
    	if(res){
    		this.setState({ locations: res });
	    	if(res[0].place === this.state.value)	{ 
	    		this.setState({ state: 'success' }); 
	    	}
	    	else this.setState({ state: 'warning' })
    	}
    return 'error';
    })
  }

	onSubmit(e){
		e.preventDefault();
		console.log('button works!');

	}

	renderAutoCompleteList(){
		return this.state.locations.map((location, index) => {
			return <option value={location.place} key={index} />
		});
	}

	renderHelpBlock(){
		if(this.state.locations.length !== 0) { 
			let loc = this.state.locations[0].place;
			return <HelpBlock>Did you mean {loc} ?</HelpBlock>
		}
		return undefined;
	}


	render() {
		return (
			<div>
	      <form onSubmit={this.onSubmit.bind(this)}>
	        <FormGroup
	          controlId="formBasicText"
	          validationState={this.getValidationState()}
	        >
	          <Col>
			      	<InputGroup>
				      	<FormControl.Feedback />
			        	<FormControl
			          type="text"
			          value={this.state.value}
			          placeholder="Enter location"
			          onChange={this.handleChange}
			          list='location'
			          autoFocus={true}
				        />
				        <datalist id='location'>{this.renderAutoCompleteList()}</datalist>
				       <InputGroup.Button>
						        <Button type='submit' disabled={this.state.state !== 'success'}>Search!</Button>
						   </InputGroup.Button>
			        </InputGroup>
					   </Col>
		       {/*{this.renderHelpBlock()}*/}
	      	</FormGroup>
      </form>
      { this.state.state == 'success' ? <Weather location={this.state.value} /> : undefined }
			</div>
		);
	}
};