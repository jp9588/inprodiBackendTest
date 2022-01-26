const Boleto = require('../models/Boletos');
const Reservacion = require('../models/Reservacion');
const Usuario = require('../models/Usuario');
const Vuelo = require('../models/Vuelos');

exports.creaBoleto = async (req, res) => {
	const { reservacion, costo, asiento, clase, statusDePago } = req.body;
	try {
		const boleto = await Boleto.create({ reservacion, costo, asiento, clase, statusDePago });
		if (boleto.length == 0) {
			return res
				.status(400)
				.json({ ok: false, msg: 'El boleto no ha sido creado, revise la informacion de entrada' });
		}
		const reservacionHecha = await Reservacion.findOne({ _id: reservacion });
		const usuario = await Usuario.findOne({ _id: reservacionHecha.usuario });
		const vuelo = await Vuelo.findOne({ _id: reservacionHecha.vuelo });
		vuelo.pasajeros = [ ...vuelo.pasajeros, boleto._id ];
		await vuelo.save();
		const { name, email, _id } = usuario;
		return res.status(201).json({
			ok: true,
			msg: 'Boleto creado correctamente',
			boleto,
			reservacionHecha,
			usuario: { name, email, _id }
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.buscarBoleto = async (req, res) => {
	const { id } = req.params;
	try {
		const boleto = await Boleto.findOne({ _id: id });
		if (boleto.length == 0) {
			return res.status(400).json({ ok: false, msg: 'El boleto no existe, verifique el id del boleto' });
		}
		return res.status(200).json({ ok: true, msg: 'El boleto ha sido encontrado', boleto });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};

exports.modificarBoleto = async (req, res) => {
	const { id } = req.params;
	const { reservacion, costo, asiento, clase, statusDePago } = req.body;

	try {
		const boleto = await Boleto.findOne({ _id: id });
		if (boleto.length == 0) {
			return res.status(400).json({ ok: false, msg: 'El boleto no existe, verifique el id del boleto' });
		}
		boleto.reservacion = reservacion;
		boleto.costo = costo;
		boleto.asiento = asiento;
		boleto.clase = clase;
		boleto.statusDePago = statusDePago;

		await boleto.save();
		return res
			.status(200)
			.json({ ok: true, msg: 'La informacion del boleto ha sido modificada correctamente', boleto });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};
exports.eliminarBoleto = async (req, res) => {
	const { id } = req.params;
	try {
		await Boleto.findByIdAndDelete({ _id: id });

		return res.status(200).json({ ok: true, msg: 'El boleto ha sido eliminado' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error en el servidor, contacte a soporte tecnico...'
		});
	}
};
