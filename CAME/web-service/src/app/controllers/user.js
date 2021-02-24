const userService = require('../services/user');

exports.login = async function(req, res, next) {
	userService.login(req.body)
		.then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
		.catch(err => next(err));
}

exports.register = async function(req, res, next) {
	userService.register(req.body)
		.then(() => res.json({message: 'Register success'}))
		.catch(err => next(err))
}

exports.getAll = async function(req, res, next) {
	userService.getAll()
		.then(users => res.json(users))
		.catch(err => next(err))
}

exports.getById = async function(req, res, next) {
	console.log(req.user)
	userService.getById(req.params.id)
		.then(user => user ? res.json(user) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.update = async function(req, res, next) {
	userService.update(req.params.id, req.body)
		.then(() => res.json({ message: 'Update user success' }))
		.catch(err => next(err))
}

exports._delete = async function(req, res, next) {
	userService._delete(req.params.id)
		.then(() => res.json({ message: 'Delete user ' + req.params.id + ' success' }))
		.catch(err => next(err))
}