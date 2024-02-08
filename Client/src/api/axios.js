import axios from 'axios'

export const candidateInstance = axios.create({
    baseURL: 'http://localhost:3000/api/candidates',
    headers: {
        'Content-Type': 'multipart/form-data',
        'charset': 'utf-8'
    },
    withCredentials: true
})

export const professionInstance = axios.create({
    baseURL: 'http://localhost:3000/api/professions',
    headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
    },
    withCredentials: true
})