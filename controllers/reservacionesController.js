const Reservacion = require('../models/Reservacion');

exports.hacerReservacion = async (req, res) => {
	const { vuelo, usuario, empleado, equipaje } = req.body;

	try {
		const reservacion = await Reservacion.create({ vuelo, usuario, empleado, equipaje });
		return res.status(201).json({ ok: true, msg: 'Reservacion exitosa', reservacion });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};
exports.mostrarReservacion = async (req, res) => {
	const { id } = req.params;

	try {
		const reservacion = await Reservacion.findOne({ _id: id });
		if (reservacion.length == 0) {
			return res.status(200).json({ ok: false, msg: 'Reservacion no existente' });
		}
		return res.status(200).json({ ok: true, msg: 'Reservacion encontrada', reservacion });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.modificarReservacion = async (req, res) => {
	const { id } = req.params;
	const { vuelo, usuario, empleado, equipaje } = req.body;

	try {
		const reservacion = await Reservacion.findOne({ _id: id });
		if (reservacion.length == 0) {
			return res.status(200).json({ ok: false, msg: 'Reservacion no existente' });
		}
		reservacion.vuelo = vuelo;
		reservacion.usuario = usuario;
		reservacion.empleado = empleado;
		reservacion.equipaje = equipaje;
		return res.status(201).json({ ok: true, msg: 'Reservacion  modificada exitosamente', reservacion });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.eliminarReservacion = async (req, res) => {
	const { id } = req.params;

	try {
		const reservacion = await Reservacion.findByIdAndDelete({ _id: id });

		return res.status(200).json({ ok: true, msg: 'La reservacion ha sido eliminada...' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};
