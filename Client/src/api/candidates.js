import { candidateInstance } from './axios';
const axios = candidateInstance;

export const getCandidatesRequest = async (page) => axios.get('/', { params: { page } });

export const getCandidateRequest = async (id) => axios.get(`/${id}`);

export const createCandidateRequest = async (data) => axios.post('/create', data);

export const updateCandidateRequest = async (id, data) => axios.patch(`/update/${id}`, data);

export const deleteCandidateRequest = async (id) => axios.delete(`/delete/${id}`);