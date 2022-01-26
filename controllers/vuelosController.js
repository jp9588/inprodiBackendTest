const Vuelo = require('../models/Vuelos');

exports.darAltaVuelo = async (req, res) => {
	let { nombre, origen, destino, fecha, cupo, pasajeros, admin } = req.body;
	fecha = Date.now();

	try {
		const vuelo = await Vuelo.create({ nombre, origen, destino, fecha, cupo, pasajeros, admin });
		return res.status(201).json({ success: true, msg: 'Vuelo dado de alta correctamente', vuelo });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.eliminarVuelo = async (req, res) => {
	let { idVuelo } = req.params;

	try {
		const vuelo = await Vuelo.findOneAndDelete({ _id: idVuelo });
		return res.status(200).json({ success: true, msg: 'El vuelo ha sido eliminado correctamente' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.todosLosVuelos = async (req, res) => {
	try {
		const vuelos = await Vuelo.find({});
		if (!vuelos.length) {
			return res.status(200).json({ ok: false, msg: 'Lo sentimos no hay vuelos registrados' });
		}
		return res.status(200).json({ ok: true, msg: 'Vuelos encontrados !!', vuelos });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.buscarPorFecha = async (req, res) => {
	try {
		const vuelos = await Vuelo.find({ fecha: req.params.fecha });
		if (!vuelos.length) {
			return res.status(200).json({ ok: false, msg: 'Lo sentimos no hay vuelos con esta fecha' });
		}
		return res.status(200).json({ ok: true, msg: 'Vuelos encontrados !!', vuelos });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.buscarPorNombre = async (req, res) => {
	try {
		const vuelos = await Vuelo.find({ nombre: req.params.nombre });
		if (!vuelos.length) {
			return res.status(200).json({ ok: false, msg: 'Lo sentimos no hay vuelo(s) con este nombre' });
		}
		return res.status(200).json({ ok: true, msg: 'Vuelos encontrados !!', vuelos });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.asignarPasajero = async (req, res) => {
	try {
		let vuelo = await Vuelo.findOne({ _id: req.params.vueloId });

		if (vuelo.length == 0) {
			return res.status(200).json({ ok: false, msg: 'Lo sentimos no hay vuelo(s) con este identificador' });
		}
		vuelo.pasajeros = [ ...vuelo.pasajeros, req.body.idPasajero ];
		await vuelo.save();
		return res.status(200).json({ ok: true, msg: 'Pasajero correctamente asignado al vuelo', vuelo });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.eliminarPasajero = async (req, res) => {
	const idPassenger = req.body.idPasajero;
	try {
		let vuelo = await Vuelo.findOne({ _id: req.params.vueloId });

		if (vuelo.length == 0) {
			return res.status(200).json({ ok: false, msg: 'Lo sentimos no hay vuelo(s) con este identificador' });
		}
		//console.log(vuelo);
		// filter(note=>note.id!==action.payload)
		vuelo.pasajeros = vuelo.pasajeros.filter((p) => p !== idPassenger);
		await vuelo.save();
		return res.status(200).json({ ok: true, msg: 'Pasajero correctamente elimando del vuelo', vuelo });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};
