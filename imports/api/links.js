import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import Shortid from 'shortid'

export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
	Meteor.publish('linksPub', function () {
		console.log('Publish', this.userId)
		return Links.find({ userId: this.userId });
	});
}
// resource.action
// emails.archive <== naming convention

Meteor.methods({
	'links.insert'(url){
		if(!this.userId) {
			throw new Meteor.Error('unauthorized');
		}
		// Simpl Schema does not take url without protocol. It appends one if not present.
		if(url.slice(0,7) !== 'http://' && url.slice(0,8) !== 'https://' && url.slice(0,6) !== 'ftp://'){
			url = 'http://' + url;
		}
		new SimpleSchema ({
			url: {
				type: String,
				label: 'Your link',
				regEx: SimpleSchema.RegEx.Url,
			}
		}).validate({ url });	

		Links.insert({
			_id: Shortid.generate(),
			url: url,
			userId: this.userId,
			visible: true,
			visitedCount: 0,
			lastVisitedAt: null,
		});
	},

	'links.setVisiblity'(_id, visible) {
		if(!this.userId) {
			throw new Meteor.Error('unauthorized');
		}

		new SimpleSchema ({
			_id: {
				type: String,
				min: 1,
				// regEx: SimpleSchema.RegEx.Id
			},
			visible: {
				type: Boolean,
			}
		}).validate( {_id, visible});
		Links.update({_id: _id, userId: this.userId}, { $set: {visible: visible} });
	},

	'links.track'(_id) {
		new SimpleSchema ({
			_id: {
				type: String,
				min: 1,
				// regEx: SimpleSchema.RegEx.Id
			}
		}).validate( {_id});
		Links.update({_id: _id}, { 
			$set: {lastVisitedAt: new Date().getTime()},
		  $inc: {visitedCount: 1} 
		});
	},

});
