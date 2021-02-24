const Config = require('../models/config');
const tenantSettingsService = require('./tenantSettings')

exports.getAll = async function() {
	return await Config.find();
}

exports.getById = async function(id) {
	return await Config.findById(id);
}

exports.getByTenantId = async function(tenant_id) {
	return await Config.findOne({
        tenantId: tenant_id.toLowerCase(),
    })
}

exports.setType = async function(tenant_id, tenant_type) {

	let types = await tenantSettingsService.getAll(true)
	
	const tenant = await Config.findOne({
		tenantId: tenant_id.toLowerCase()
	})

	let index = await types.indexOf(tenant_type)

	if (index !== -1) {
		tenant.type = tenant_type
		await tenant.save()
	} else {
		throw 'Type for this config is not valid'
	}

}

exports.add = async function(data) {
	let types = tenantSettingsService.getAll(true)

	if (types.indexOf(data.type) === -1) {
		throw 'Type for this config is not valid'
	}

	let config = new Config(data)

	await config.save()
}