import bankDataApi from './axiosInstances/bankDataService';

export const getAllBanksForCity = (city) =>
	bankDataApi.get(`/banks?city=${city}`);
