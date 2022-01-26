const mongoose = require('mongoose');

const vueloSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	origen: {
		type: String,
		required: true
	},
	destino: {
		type: String,
		required: true
	},
	fecha: {
		type: Date,
		required: true
	},
	cupo: {
		type: Number,
		required: true
	},
	admin: {
		type: String,
		required: true
	},
	pasajeros: [ { type: String } ]
});

const Vuelo = mongoose.model('vuelos', vueloSchema);

module.exports = Vuelo;
