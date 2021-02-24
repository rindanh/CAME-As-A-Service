const jwt = require('jsonwebtoken');

const configJWT = require('../../config/jwt');

const User = require('../models/user');

exports.login = async function({ username, password }) {
	const user = await User.findOne({ username });
    if (user && user.verifyPassword(password)) {
        const { password, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign({ id: user.id, username: user.username, tenantId: user.tenantId }, configJWT.secret);
        return {
            ...userWithoutPassword,
            token
        };
    }
}

exports.register = async function(params) {
	// check if username is already available
	if (await User.findOne({ username: params.username })) {
		throw 'Username (' + params.username + ') is already taken';
	}

	const user = new User(params);

    // save user
    await user.save();
}

exports.getAll = async function() {
	return await User.find().select('-password');
}

exports.getById = async function(id) {
	return await User.findById(id).select('-password');
}

exports.update = async function(id, params) {

	const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username (' + params.username + ') is already taken';
    }

    // copy userParam properties to user
    Object.assign(user, params);

    await user.save();
}

exports._delete = async function(id) {
    await User.findByIdAndRemove(id);
}