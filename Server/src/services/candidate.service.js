const db = require('../database/models');
const Op = db.Sequelize.Op;

const candidateService = {};

/**
 * Crear un Aspirante por su id con los campos proporsionados
 * @param {*} object Objeto con los campos id, dni, name, surname, email, phone, birthday, gender, image
 * @returns {Promise}
 */
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

/**
 * Actualizar un Aspirante por su id con los campos proporsionados
 * @param {*} object Objeto con los campos id, dni, name, surname, email, phone, birthday, gender, image
 * @returns {Promise}
 */
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

/**
 * Eliminar un Aspirante por su id
 * @param {*} object Objeto con el id
 * @returns {Promise}
 */
candidateService.delete = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos el id del aspirante con desestructuración
            const { id } = object;

            // en caso de que no venga el id retornamos un error
            if (!id) throw new Error('ID del aspirante es requerido');

            // eliminamos el aspirante
            await db.Candidate.destroy({ where: { id: id } });

            // retornamos como promesa resuelta
            return resolve(true);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al borrar el aspirante: ' + error.message);
        }
    })
}

/**
 * Obtener las condicones para filtrar los Aspirantes en base a los query params
 * @param {*} object Objeto con los query params
 * @returns {Object} 
 */
candidateService.whereConditions = (query) => {
    // extraemos los query params con desestructuración
    // en caso de que no vengan los query params retornamos null por defecto
    const {
        name = null,
        surname = null,
        gender = null,
    } = query;

    // creamos un objeto con los query params para la condición where del Aspirante
    let candidateConditions = {};
    if (name) candidateConditions.name = { [Op.like]: `%${name}%` };
    if (surname) candidateConditions.surname = { [Op.like]: `%${surname}%` };
    if (gender) candidateConditions.gender = { [Op.like]: `%${gender}%` };

    // si no hay query params para la condición where de los aspirantes retornamos como undefined
    if (Object.keys(candidateConditions).length === 0) candidateConditions = undefined;

    return { candidateConditions }
}

module.exports = candidateService;