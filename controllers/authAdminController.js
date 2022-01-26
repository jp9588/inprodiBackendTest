const Admin = require('../models/Administradores');
const bcrypt = require('bcryptjs');
const { generaToken } = require('../config/jwt');

exports.createNewAdmin = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const adminEndb = await Admin.findOne({ email: email });
		if (!adminEndb) {
			const admin = await Admin.create({ name, email, password });

			admin.password = bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10));

			await admin.save();

			const token = await generaToken(admin.id, admin.name);

			return res.status(201).json({
				ok: true,
				msg: 'nuevo administrador creado',
				uid: admin.id,
				nameUser: admin.name,
				token
			});
		} else {
			return res.status(401).json({
				ok: false,
				msg: 'El Administrador ( con email) que intento crear ya existe en esta aplicacion'
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

exports.loginAdminRequest = async (req, res) => {
	const { email, password } = req.body;

	try {
		const adminEndb = await Admin.findOne({ email: email });

		if (!adminEndb) {
			return res.status(400).json({
				ok: false,
				msg: 'Email o password no validos'
			});
		}
		const isValid = bcrypt.compareSync(password, adminEndb.password);

		if (!isValid) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecta !'
			});
		}

		//sobrevivio a todo ahora a generar el token
		const token = await generaToken(adminEndb.id, adminEndb.name);

		res.status(200).json({
			ok: true,
			msg: 'login successfull',
			uid: adminEndb.id,
			username: adminEndb.name,
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
