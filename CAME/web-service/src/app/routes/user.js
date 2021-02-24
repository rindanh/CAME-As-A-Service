
module.exports = function(app) {
	const User = require('../controllers/user')

	app.route('/').get((req, res) => {
		res.send('Welcome to CAME Tools');
	});	

	app.route('/login')
		.post(User.login)

	app.route('/register')
		.post(User.register)

	app.route('/users')
		.get(User.getAll)

	// app.route('/users/current')
	// 	.get(User.getCurrent)

	app.route('/users/:id')
		.get(User.getById)

	app.route('/users/:id')
		.put(User.update)

	app.route('/users/:id')
		.delete(User._delete)
}