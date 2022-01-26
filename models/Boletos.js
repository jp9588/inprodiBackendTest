const mongoose = require('mongoose');

const boletoSchema = mongoose.Schema({
	reservacion: {
		type: String,
		required: true
	},
	costo: {
		type: Number,
		required: true
	},
	asiento: {
		type: String,
		required: true
	},
	clase: {
		type: String,
		required: true
	},
	statusDePago: {
		type: Boolean,
		required: true
	}
});

const Boleto = mongoose.model('boletos', boletoSchema);

module.exports = Boleto;
