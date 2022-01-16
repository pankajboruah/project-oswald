import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const BankContext = createContext();

export const BankProvider = (props) => {
	const [banks, setBanks] = useState([]);
	const [favorites, setFavorites] = useState([]);

	const getBankDetails = (ifsc) => banks.filter((el) => el.ifsc === ifsc)[0];

	const addToFavorites = (bank) => {
		let res = [...favorites];
		res.push(bank);
		setFavorites(res);
	};

	const removeFromFavorites = (ifsc) => {
		let res = [...favorites].filter((el) => el.ifsc !== ifsc);
		setFavorites(res);
	};

	const isFavorite = (ifsc) =>
		favorites.findIndex((el) => el.ifsc === ifsc) > -1;

	const value = React.useMemo(
		() => ({
			bankData: [banks, setBanks],
			favoriteBanksData: [favorites, setFavorites],
			getBankDetails,
			addToFavorites,
			removeFromFavorites,
			isFavorite,
		}),
		[banks, favorites],
	);

	return (
		<BankContext.Provider value={value} getBankDetails={getBankDetails}>
			{props.children}
		</BankContext.Provider>
	);
};

BankProvider.propTypes = {
	children: PropTypes.object,
};
