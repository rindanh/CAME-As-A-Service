const TenantSettings = require('../models/tenantSettings');

exports.getAll = async function(type) {
	if (type) {
		let arr_types = []
		let temp = await TenantSettings.find({}, {type:1, _id:0});

		if (!temp) throw 'Failed to get all types';

		for (let t of temp) {
			arr_types.push(t.type)
		}
		return arr_types

	} else {
		return await TenantSettings.find();
	}
	
}

exports.getByType = async function(type) {
	return await TenantSettings.findOne({
        type: type.toLowerCase(),
    })
}

exports.add = async function(data) {

	data.type = data.type.toLowerCase()

	tenantSettings = new TenantSettings(data)

	await tenantSettings.save()
}