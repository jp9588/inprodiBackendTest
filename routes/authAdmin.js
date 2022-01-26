const express = require('express');

const router = express.Router();
const authAdminController = require('../controllers/authAdminController');
const checkFields = require('../middlewares/validator-field');
const { check } = require('express-validator');

// /api/auth/admin

router.post('/new', [
	check('name', 'El nombre es un campo Requerido').not().isEmpty(),
	check('email', 'El email debe de ser valido!').isEmail(),
	check('password', 'El password debe ser mayor de 6 caracteres').isLength({ min: 6 }),
	checkFields,
	authAdminController.createNewAdmin
]);
router.post(
	'/',
	[
		check('email', 'El email debe de valido o no esta registrado').isEmail(),
		check('password', 'El password es incorrecto y no debe ser menor a 6 caracteres').isLength({ min: 6 }),
		checkFields
	],
	authAdminController.loginAdminRequest
);

module.exports = router;
