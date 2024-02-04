const db = require('../database/models');
const candidateService = {};

candidateService.create = async (object) => {
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
            return resolve(newCandidate.dataValues);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al crear el aspirante: ' + error.message);
        }
    });
}

candidateService.update = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { id, dni, name, surname, email, phone, birthday, gender, image } = object;

            // creamos un objeto con los campos que se hayan proporcionado
            let updateFields = {};
            if (dni) updateFields.dni = dni;
            if (name) updateFields.name = name;
            if (surname) updateFields.surname = surname;
            if (email) updateFields.email = email;
            if (phone !== undefined) updateFields.phone = phone;
            if (birthday) updateFields.birthday = birthday;
            if (gender) updateFields.gender = gender;
            if (image) updateFields.image = image;

            // Actualizamos el Aspirante
            const updatedCandidate = await db.Candidate.update(updateFields, { where: { id } });
            
            // retornamos la variable como promesa resuelta
            return resolve(updatedCandidate);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al actualizar el aspirante: ' + error.message);
        }
    })
}


module.exports = candidateService;