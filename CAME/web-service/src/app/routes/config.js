
module.exports = function(app) {
	const Config = require('../controllers/config')

	app.route('/configs')
		.get(Config.getAll)

	app.route('/configs/:id')
		.get(Config.getById)

	app.route('/configs/set-type')
		.put(Config.setType)

}