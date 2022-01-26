const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

const Empleado = mongoose.model('empleado', empleadoSchema);

module.exports = Empleado;
