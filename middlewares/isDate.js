const moment = require('moment');

const isDateValid = (value) => {
	if (!value) {
		return false;
	}

	const date = moment(value);

	if (date.isValid()) {
		return true;
	} else {
		return false;
	}
};

module.exports = { isDateValid };
