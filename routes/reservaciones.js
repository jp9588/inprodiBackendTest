const express = require('express');
const reservacionesController = require('../controllers/reservacionesController');
const validaJwt = require('../middlewares/validar-jwt');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');

const router = express.Router();

// /api/reservaciones

router.post(
	'/',
	[
		check('vuelo', 'El nombre del vuelo es un campo Requerido').not().isEmpty(),
		check('usuario', 'El usuario es un campo Requerido').not().isEmpty(),
		check('empleado', 'El empleado es un campo Requerido').not().isEmpty(),
		check('equipaje', 'La equipaje es un campo Requerido').not().isEmpty(),
		checkFields
	],
	validaJwt,
	reservacionesController.hacerReservacion
);
router.get('/:id', validaJwt, reservacionesController.mostrarReservacion);
router.put(
	'/modificar/:id',
	[
		check('vuelo', 'El vuelo es un campo Requerido').not().isEmpty(),
		check('usuario', 'El usuario es un campo Requerido').not().isEmpty(),
		check('empleado', 'El empleado es un campo Requerido').not().isEmpty(),
		check('equipaje', 'La equipaje es un campo Requerido').not().isEmpty(),
		checkFields
	],
	validaJwt,
	reservacionesController.modificarReservacion
);
router.delete('/eliminar/:id', validaJwt, reservacionesController.eliminarReservacion);

module.exports = router;
