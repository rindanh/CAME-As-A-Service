const characteristicService = require('../services/characteristic');

exports.add = async function(req, res, next) {
	characteristicService.add(req.body)
		.then(() => res.json({ message: 'Add characteristic success' }))
		.catch(err => next(err));
}

exports.getAll = async function(req, res, next) {
	characteristicService.getAll()
		.then(characteristics => res.json(characteristics))
		.catch(err => next(err))
}

exports.getById = async function(req, res, next) {
	characteristicService.getById(req.params.id)
		.then(characteristic => characteristic ? res.json(characteristic) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.update = async function(req, res, next) {
	characteristicService.update(req.params.id, req.body)
		.then(() => res.json({ message: 'Update characteristic success' }))
		.catch(err => next(err))
}

exports._delete = async function(req, res, next) {
	characteristicService._delete(req.params.id)
		.then(() => res.json({ message: 'Delete characteristic ' + req.params.id + ' success' }))
		.catch(err => next(err))
}