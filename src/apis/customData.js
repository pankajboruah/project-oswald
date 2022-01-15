import customDataApi from './axiosInstances/customDataService';

export const getAllData = () => customDataApi.get(`/data`);
