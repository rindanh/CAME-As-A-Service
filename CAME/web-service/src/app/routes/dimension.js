
module.exports = function(app) {
	const Dimension = require('../controllers/dimension')

	app.route('/dimensions')
		.get(Dimension.getAll)
}