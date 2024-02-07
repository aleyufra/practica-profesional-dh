import axios from 'axios'

export const candidateInstance = axios.create({
    baseURL: 'http://localhost:3000/api/candidates',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const professionInstance = axios.create({
    baseURL: 'http://localhost:3000/api/professions',
    headers: {
        'Content-Type': 'application/json'
    },
})