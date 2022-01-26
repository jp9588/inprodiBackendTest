const mongoose = require('mongoose');

const reservacionSchema = mongoose.Schema({
	vuelo: {
		type: String,
		required: true
	},
	usuario: {
		type: String,
		required: true
	},
	empleado: {
		type: String,
		required: true
	},

	equipaje: [ { type: String } ]
});

const Reservacion = mongoose.model('reservacion', reservacionSchema);

module.exports = Reservacion;
