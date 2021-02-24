
module.exports = function(app) {
	const Characteristic = require('../controllers/characteristic')

	app.route('/characteristics')
		.post(Characteristic.add)

	app.route('/characteristics')
		.get(Characteristic.getAll)

	app.route('/characteristics/:id')
		.get(Characteristic.getById)

	app.route('/characteristics/:id')
		.put(Characteristic.update)

	app.route('/characteristics/:id')
		.delete(Characteristic._delete)
}