import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Location = new Mongo.Collection('location');

Meteor.methods({
	'location.find'(locname){
		if(!locname && Meteor.isServer){
			throw new Meteor.Error('Location is empty');
		}
		const locc = locname + '.*';
		const loc = Location.find({
			place: {$regex: locc, $options: "i"},
		}).fetch();
		return loc;
		new SimpleSchema ({
			locname: {
				type: String,
				min: 3,
				max: 20
			}
		}).validate({ locname });	

	},

	'location.insert'(place){
		if(!place){
			throw new Meteor.Error('Place is empty');
		}
		const r = Location.insert({
			place: place
		})
		return r
	},

})
