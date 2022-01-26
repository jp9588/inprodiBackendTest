const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generaToken } = require('../config/jwt');

exports.createNewUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const usuarioEndb = await Usuario.findOne({ email: email });
		if (!usuarioEndb) {
			const usuario = await Usuario.create({ name, email, password });

			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));

			await usuario.save();

			const token = await generaToken(usuario.id, usuario.name);

			return res.status(201).json({
				ok: true,
				msg: 'new user created',
				uid: usuario.id,
				nameUser: usuario.name,
				token
			});
		} else {
			return res.status(401).json({
				ok: false,
				msg: 'El usuario (email) que intento crear ya existe en esta aplicacion'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.loginUserRequest = async (req, res) => {
	const { email, password } = req.body;

	try {
		const usuarioEndb = await Usuario.findOne({ email: email });

		if (!usuarioEndb) {
			return res.status(400).json({
				ok: false,
				msg: 'Email o password no validos'
			});
		}
		const isValid = bcrypt.compareSync(password, usuarioEndb.password);

		if (!isValid) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecta !'
			});
		}

		//sobrevivio a todo ahora a generar el token
		const token = await generaToken(usuarioEndb.id, usuarioEndb.name);

		res.status(200).json({
			ok: true,
			msg: 'login successfull',
			uid: usuarioEndb.id,
			username: usuarioEndb.name,
			token
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.renewToken = async (req, res) => {
	const uid = req.uid;
	const name = req.name;

	const token = await generaToken(uid, name);

	res.json({
		ok: true,
		msg: 'new token send',
		uid,
		name,
		token
	});
};
