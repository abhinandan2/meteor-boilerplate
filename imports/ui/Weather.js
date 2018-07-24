import React from 'react';
import { Meteor } from 'meteor/meteor';

let loc_url = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0o0qJX8QJDeuz1r7StDkvriK80GmYTtU&q="
let forecast_url = "http://dataservice.accuweather.com/currentconditions/v1/"
let api_key = "?apikey=0o0qJX8QJDeuz1r7StDkvriK80GmYTtU"
export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      Weather: null,
    }
  }

  componentDidMount() {
  	let loc = loc_url;
  	loc += this.props.location;
    fetch(loc)
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(loc, result)

        	let url = forecast_url + result[0].Key + api_key;
        	console.log('Calling ', url);
    	    fetch(url)
			      .then(res => res.json())
			      .then(
			        (result) => {
			        	console.log('Got reply, ', result);
			          this.setState({
			            isLoaded: true,
			            items: result,
			          });
			    })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      	<div>
      	<h1> It's {items[0].WeatherText} with {items[0].Temperature.Metric.Value}°C in {this.props.location} </h1>
      	<a href={items[0].Link}>Source</a>
      	</div>
      );
    }
  }
}


        // <ul>
        //   {items.map(item => (
	       //    <li key={item.EpochTime}>
	       //      {item.WeatherText}
	       //    </li>
        //   ))}
        // </ul>