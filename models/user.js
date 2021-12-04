
/**
 * @file This file contains the model functions responsible for performing databse operations for the user
 * @author Girik Prabhakar
 */
/**
 * This file contains the model functions responsible for performing databse operations for the user
 * @module Model/User
 */
const mongoose = require('mongoose');
/**
 * Describes the schema of the user document
 */
const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: {type: String,required: true},
        email: { type: String, required: true, unique: true},
        dob: {type: Date, required: true},
		token: { type: String },
	},
	{ collection: 'users' }
);


const model = mongoose.model('UserSchema', UserSchema)

module.exports = model