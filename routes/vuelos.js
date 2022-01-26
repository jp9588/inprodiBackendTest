const express = require('express');

const router = express.Router();
const vuelosController = require('../controllers/vuelosController');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');
const validaJwt = require('../middlewares/validar-jwt');
const { isDateValid } = require('../middlewares/isDate');

// /api/vuelos/

router.post(
	'/crear-vuelo',
	[
		validaJwt,
		check('nombre', 'El nombre es un campo Requerido').not().isEmpty(),
		check('origen', 'El origen es un campo Requerido').not().isEmpty(),
		check('destino', 'El destino es un campo Requerido').not().isEmpty(),
		check('fecha', 'La fecha es un campo Requerido').custom(isDateValid),
		check('cupo', 'El cupo es un campo Requerido').not().isEmpty(),

		checkFields
	],
	vuelosController.darAltaVuelo
);

router.get('/', validaJwt, vuelosController.todosLosVuelos);
router.delete('/eliminar-vuelo/:idVuelo', vuelosController.eliminarVuelo);

router.get('/buscar-fecha/:fecha', validaJwt, vuelosController.buscarPorFecha);
router.get('/buscar-nombre/:nombre', validaJwt, vuelosController.buscarPorNombre);
router.put('/asigna-pasajero/:vueloId', validaJwt, vuelosController.asignarPasajero);
router.delete('/eliminar-pasajero/:vueloId', validaJwt, vuelosController.eliminarPasajero);

module.exports = router;
