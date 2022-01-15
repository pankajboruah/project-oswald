import axios from 'axios';
import { constants } from 'utils/constants';

const customDataApi = axios.create({
	baseURL: constants('customServiceUrl'),
	timeout: 0,
});

customDataApi.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error);
	},
);

export default customDataApi;
