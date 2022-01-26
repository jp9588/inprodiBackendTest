const jwt = require('jsonwebtoken');

const validaJwt = (req, res, next) => {
	///by x-token header

	const token = req.header('x-token');

	if (!token) {
		res.status(401).json({
			ok: false,
			msg: 'El token esta vacio'
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SEED);
		//console.log(payload);
		req.uid = payload.uid;
		req.name = payload.name;
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Token no valido'
		});
	}

	next();
};

module.exports = validaJwt;
