
module.exports = function(app) {
	const TenantSettings = require('../controllers/tenantSettings')

	app.route('/tenant-settings')
		.get(TenantSettings.getAll)

	app.route('/tenant-settings/types')
		.get(TenantSettings.getAllTypes)

	app.route('/tenant-settings/:type')
		.get(TenantSettings.getByType)

	app.route('/tenant-settings')
		.post(TenantSettings.add)

}