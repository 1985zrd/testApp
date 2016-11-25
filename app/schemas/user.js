'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOT = 10;

var userSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String
	},
	password: String,
	email: String,
	img: {
		type: String,
		default: "hearts"
	},
	role: {
		type: Number,
		default: 1
	},
	createTime: {
		type:Date,
		default:Date.now()
	},
	updateTime: {
		type:Date,
		default:Date.now()
	}
});

userSchema.pre('save', function(next){
	this.updateTime = Date.now();

	var user = this;

	bcrypt.genSalt(SALT_WORK_FACTOT, function(err, salt){
		if(err){
			return next(err)
		}
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next(err)
			}
			user.password = hash
			next();
		})
	})
});

userSchema.methods = {
	comparePassword: function(_password, cb){
		bcrypt.compare(_password, this.password, function(err, isMatch){
			if(err) return cb(err)

			cb(null, isMatch);
		})
	}
}

userSchema.statics = {
	fetch: function(obj,cb){
		return this
		.find(obj)
		.sort({'createTime':-1})
		.skip(0)
		.limit(100)
		.exec(cb)
	},
	findById: function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = userSchema
