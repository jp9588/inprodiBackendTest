const jwt = require('jsonwebtoken');

exports.generaToken = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SEED,
			{
				expiresIn: '2h'
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('No se pudo generar el token');
				}
				resolve(token);
			}
		);
	});
};
