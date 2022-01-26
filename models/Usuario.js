const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
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

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;
