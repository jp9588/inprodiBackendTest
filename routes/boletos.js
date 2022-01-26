const express = require('express');

const router = express.Router();
const boletosController = require('../controllers/boletosController');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');
const validaJwt = require('../middlewares/validar-jwt');

// /api/boletos

router.post(
	'/crearBoleto',
	[
		check('reservacion', 'El id de la reservacion es un campo Requerido').not().isEmpty(),
		check('costo', 'El costo es un campo Requerido').not().isEmpty(),
		check('asiento', 'El asiento es un campo Requerido').not().isEmpty(),
		check('clase', 'La clase es un campo Requerido').not().isEmpty(),
		check('statusDePago', 'El statusDePago es un campo Requerido').not().isEmpty(),
		checkFields
	],
	validaJwt,
	boletosController.creaBoleto
);
router.get('/buscar-boleto/:id', validaJwt, boletosController.buscarBoleto);
router.put(
	'/modificar-info/:id',
	[
		check('reservacion', 'El id de la reservacion es un campo Requerido').not().isEmpty(),
		check('costo', 'El costo es un campo Requerido').not().isEmpty(),
		check('asiento', 'El asiento es un campo Requerido').not().isEmpty(),
		check('clase', 'La clase es un campo Requerido').not().isEmpty(),
		check('statusDePago', 'El statusDePago es un campo Requerido').not().isEmpty(),
		checkFields
	],
	validaJwt,
	boletosController.modificarBoleto
);
router.delete('/eliminar/:id', validaJwt, boletosController.eliminarBoleto);
module.exports = router;
