const tenantSettingsService = require('../services/tenantSettings');

exports.getAll = async function(req, res, next) {
	tenantSettingsService.getAll()
		.then(tenantSettings => res.json(tenantSettings))
		.catch(err => next(err))
}

exports.getAllTypes = async function(req, res, next) {
	tenantSettingsService.getAll(true)
		.then(types => res.json(types))
		.catch(err => next(err))
}

exports.getByType = async function(req, res, next) {
	tenantSettingsService.getByType(req.params.type)
		.then(tenantSettings => tenantSettings ? res.json(tenantSettings) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.add = async function(req, res, next) {
	tenantSettingsService.add(req.body)
		.then(() => res.json({message: 'Add tenantSettings success'}))
		.catch(err => next(err))
}
