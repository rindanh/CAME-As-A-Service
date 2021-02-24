const Characteristic = require('../models/characteristic');
const slugify = require("slugify");

// CRUD

exports.add = async function(params) {

    if (!params.length) {
        params = [ params ]
    }

	params.forEach(e => {
        e.id = slugify(e.name, {
            replacement: "-",
            remove: /[*+~.()'"!:@]/g,
            lower: true
        });
        e.characteristicValues.forEach(el => {
            el.ref = el.ref ? el.ref : el.values.join("/");
        });
    })

    await Characteristic.insertMany(params)
    

	// const characteristic = new Characteristic(params);

    // save characteristic
    // await characteristic.save();
}

exports.getAll = async function() {
	return await Characteristic.find();
}

exports.getById = async function(id) {
	return await Characteristic.findById(id);
}

exports.update = async function(id, params) {

	const characteristic = await Characteristic.findById(id);

    // validate
    if (!characteristic) throw 'Characteristic not found';

    // copy userParam properties to user
    Object.assign(characteristic, params);

    await characteristic.save();
}

exports._delete = async function(id) {
    await Characteristic.findByIdAndRemove(id);
}