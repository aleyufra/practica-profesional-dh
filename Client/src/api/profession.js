import { professionInstance } from "./axios";
const axios = professionInstance;

export const getProfessionsRequest = async () => axios.get('/');
