const express = require('express');

const router = express.Router();
const authUserController = require('../controllers/authUserController');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');
const validaJwt = require('../middlewares/validar-jwt');

// /api/auth

router.post(
	'/new',
	[
		check('name', 'El nombre es un campo Requerido').not().isEmpty(),
		check('email', 'El email debe de ser valido!').isEmail(),
		check('password', 'El password debe ser mayor de 6 caracteres').isLength({ min: 6 }),
		checkFields
	],
	authUserController.createNewUser
);

router.post(
	'/',
	[
		check('email', 'El email debe de valido o no esta registrado').isEmail(),
		check('password', 'El password es incorrecto y no debe ser menor a 6 caracteres').isLength({ min: 6 }),
		checkFields
	],
	authUserController.loginUserRequest
);

router.get('/renew', validaJwt, authUserController.renewToken);

module.exports = router;
