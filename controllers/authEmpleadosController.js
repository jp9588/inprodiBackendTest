const Empleados = require('../models/Empleados');
const bcrypt = require('bcryptjs');
const { generaToken } = require('../config/jwt');

exports.createNewEmpleado = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const empleadoEndb = await Empleados.findOne({ email: email });
		if (!empleadoEndb) {
			const empleado = await Empleados.create({ name, email, password });

			empleado.password = bcrypt.hashSync(empleado.password, bcrypt.genSaltSync(10));

			await empleado.save();

			const token = await generaToken(empleado.id, empleado.name);

			return res.status(201).json({
				ok: true,
				msg: 'nuevo empleado creado',
				uid: empleado.id,
				nameUser: empleado.name,
				token
			});
		} else {
			return res.status(401).json({
				ok: false,
				msg: 'El empleado ( con email) que intento crear ya existe en esta aplicacion'
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

exports.loginEmpleadoRequest = async (req, res) => {
	const { email, password } = req.body;

	try {
		const empleadoEndb = await Empleados.findOne({ email: email });

		if (!empleadoEndb) {
			return res.status(400).json({
				ok: false,
				msg: 'Email o password no validos'
			});
		}
		const isValid = bcrypt.compareSync(password, empleadoEndb.password);

		if (!isValid) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecta !'
			});
		}

		//sobrevivio a todo ahora a generar el token
		const token = await generaToken(empleadoEndb.id, empleadoEndb.name);

		res.status(200).json({
			ok: true,
			msg: 'login successfull',
			uid: empleadoEndb.id,
			username: empleadoEndb.name,
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
