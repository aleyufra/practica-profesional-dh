import { professionInstance } from "./axios";
const axios = professionInstance;

export const getProfessionsRequest = async (params) => axios.get('/', {
    params: params
});
