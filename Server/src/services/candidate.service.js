const db = require('../database/models');
const candidateService = {};

candidateService.createCandidate = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { name, surname, dni, email, phone, birthday, gender, image } = object;

            // creamos el candidato con los campos extraidos y lo guardamos en una variable
            const newCandidate = await db.Candidate.create({
                name,
                surname,
                dni,
                email,
                phone,
                birthday,
                gender,
                image
            });

            // retornamos la variable como promesa resuelta
            return resolve(newCandidate);

        } catch (error) {
            // en caso de error retornamos la variable como promesa rechazada
            return reject(error);
        }
    });
}


module.exports = candidateService;