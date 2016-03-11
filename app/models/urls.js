'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

var Url = new Schema({
	url: {
		type: String,
		validate:{
		    validator: function(v) {
                return urlPattern.test(v);
            },
            message: '{VALUE} is not a valid URL.'
		},
		required : true,
		unique: true
	}
});

autoIncrement.initialize(mongoose.connection);
Url.plugin(autoIncrement.plugin, 'Url');

module.exports = mongoose.model('Url', Url);
