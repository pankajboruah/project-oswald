import axios from 'axios';
import { constants } from 'utils/constants';

const bankDataApi = axios.create({
	baseURL: constants('bankDataServiceUrl'),
	timeout: 0,
});

bankDataApi.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error);
	},
);

export default bankDataApi;
