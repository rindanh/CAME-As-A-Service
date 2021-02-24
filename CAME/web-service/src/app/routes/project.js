
module.exports = function(app) {
	const Project = require('../controllers/project')

	app.route('/projects')
		.post(Project.add)

	app.route('/projects')
		.get(Project.getAll)

	app.route('/projects/:id')
		.get(Project.getById)

	app.route('/projects/method-chunks')
		.post(Project.getMCFromMBMS)

	app.route('/projects/find-recommendation')
		.post(Project.getMCRecommendations)

	app.route('/projects/:user_id/:project_id')
		.get(Project.getByPid)

	app.route('/projects/save-method')
		.post(Project.saveMethod)

	app.route('/projects/:user_id/:project_id')
		.put(Project.update)

	app.route('/projects/:id')
		.delete(Project._delete)

	app.route('/cobacoba')
		.get(Project.cobacoba)
}