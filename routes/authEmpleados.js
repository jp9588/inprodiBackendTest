const express = require('express');

const router = express.Router();
const authEmpleadosController = require('../controllers/authEmpleadosController');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');
const validaJwt = require('../middlewares/validar-jwt');

// /api/auth/empleados

router.post('/new', [
	check('name', 'El nombre es un campo Requerido').not().isEmpty(),
	check('email', 'El email debe de ser valido!').isEmail(),
	check('password', 'El password debe ser mayor de 6 caracteres').isLength({ min: 6 }),
	checkFields,
	authEmpleadosController.createNewEmpleado
]);
router.post(
	'/',
	[
		check('email', 'El email debe de valido o no esta registrado').isEmail(),
		check('password', 'El password es incorrecto y no debe ser menor a 6 caracteres').isLength({ min: 6 }),
		checkFields
	],
	authEmpleadosController.loginEmpleadoRequest
);

module.exports = router;
