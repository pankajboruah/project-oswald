/* eslint-disable */
const { data } = require('./src/constants/db.json');

module.exports = () => {
	const res = data.filter(
		({ name, currentPrice, prevPrice }) =>
			name.length > 0 && !!currentPrice && !!prevPrice,
	);
	return { data: res };
};
