const dimensionService = require('../services/dimension');

exports.getAll = async function(req, res, next) {
	dimensionService.getAll()
		.then(dimensions => res.json(dimensions))
		.catch(err => next(err))
}
