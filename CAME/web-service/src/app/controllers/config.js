const configService = require('../services/config');

exports.getAll = async function(req, res, next) {
	if (req.query.tenant_id) {
		configService.getByTenantId(req.query.tenant_id)
			.then(config => config ? res.json(config) : res.sendStatus(404))
			.catch(err => next(err))
	} else {
		configService.getAll()
			.then(configs => res.json(configs))
			.catch(err => next(err))
	}
	
}

exports.getById = async function(req, res, next) {
	configService.getById(req.params.id)
		.then(config => config ? res.json(config) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.setType = async function(req, res, next) {
	configService.setType(req.body.tenant_id, req.body.type)
		.then(() => res.json("success"))
		.catch(err => next(err))
}
