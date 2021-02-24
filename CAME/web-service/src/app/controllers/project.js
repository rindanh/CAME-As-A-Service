const projectService = require('../services/project');

exports.add = async function(req, res, next) {
	projectService.add(req.body, req.user)
		.then(projects => projects ? res.json({ message: 'Add project success' }) : res.status(400).json({message: "Some error occurred while saving"}))
		.catch(err => next(err));
}

exports.getAll = async function(req, res, next) {
	if (req.query.tenantId) {
		projectService.getAllPerTenant(req.query.tenantId, req.user)
			.then(projects => res.json(projects))
			.catch(err => next(err))
	} else {
		projectService.getAll()
			.then(projects => res.json(projects))
			.catch(err => next(err))
	}
}

exports.getById = async function(req, res, next) {
	projectService.getById(req.params.id)
		.then(project => project ? res.json(project) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.getByPid = async function(req, res, next) {
	projectService.getByPid(req.params.user_id, req.params.project_id)
		.then(project => project ? res.json(project) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.getMCRecommendations = async function(req, res, next) {
	projectService.getMCRecommendations(req.body.project_id)
		.then(method_chunks => method_chunks ? res.json(method_chunks) : res.sendStatus(404))
		.catch(err => next(err))
}

exports.getMCFromMBMS = async function(req, res, next) {
	projectService.getMCFromMBMS(req.body.method_chunks, req.body.project_id)
		.then(() => res.json({message: 'Get All MC for this project success'}))
		.catch(err => next(err))
}

exports.saveMethod = async function(req, res, next) {
	projectService.saveMethod(req.body.project_id, req.body.method, req.user)
		.then(() => res.json({message: 'Save Method Success'}))
		.catch(err => next(err))
}

exports.update = async function(req, res, next) {
	projectService.update(req.params.user_id, req.params.project_id, req.body)
		.then(() => res.json({ message: 'Update project success' }))
		.catch(err => next(err))
}

exports._delete = async function(req, res, next) {
	projectService._delete(req.params.id)
		.then(() => res.json({ message: 'Delete project ' + req.params.id + ' success' }))
		.catch(err => next(err))
}

exports.cobacoba = async function(req, res, next) {
	projectService.cobacoba()
		.then(projects => res.json(projects))
		.catch(err => next(err))
}