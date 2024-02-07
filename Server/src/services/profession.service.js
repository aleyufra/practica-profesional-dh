const db = require('../database/models');

const professionService = {};

/**
 * Crear una o varias profesiones por el id del aspirante con los campos proporsionados
 * @param {*} object Objeto con los campos de profesesion e id del aspirante
 * @returns {Promise}
 */
professionService.create = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { professions, candidate_id } = object;

            // creamos el candidato con los campos extraidos y lo guardamos en una variable
            // retornamos un array de objetos de profesiones con los campos necesarios sin la profession en null
            const professionsToCreate = professions.map((p) => {
                return {
                    profession: p.profession ? p.profession : null,
                    candidate_id: candidate_id
                }
            }).filter((p) => p.profession !== null);

            // creamos las professiones en la base de datos
            await db.Profession.bulkCreate(professionsToCreate);

            // retornamos como promesa resuelta
            return resolve(true);

        } catch (error) {
            // en caso de error retornamos la variable como promesa rechazada
            return reject('Error al crear las professiones: ' + error.message);
        }
    })
}

/**
 * Actualizar una o varias profesiones por id del aspirante con los campos proporsionados
 * @param {*} object Objeto con los campos de profesesion e id del aspirante
 * @returns {Promise}
 */
professionService.update = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { professions = [], candidate_id } = object;

            // creamos un array de objetod de aspirantes con los campos extraidos
            const professionsArray = professions.map((p) => {
                return {
                    id: p.id ? p.id : null,
                    profession: p.profession ? p.profession : null,
                    candidate_id: candidate_id
                }
            });

            // filtramos las professiones que existan en la base de datos
            const existingProfessions = professionsArray.filter((p) => p.id !== null);
            // filtramos las professiones que NO existan en la base de datos
            const nonExistingProfessions = professionsArray.filter((p) => p.id === null);

            // creamos las professiones en la base de datos
            await Promise.all(nonExistingProfessions.map(async (profession) => {
                if (profession.profession !== null || profession.profession !== '')
                    await db.Profession.create(profession);
            }));

            // actualizamos las professiones en la base de datos
            await Promise.all(existingProfessions.map(async (profession) => {
                if (profession.profession === null || profession.profession === '') {
                    // si la profession es null o vacia, eliminamos la profession de la base de datos
                    await db.Profession.destroy({ where: { id: profession.id } })
                } else {
                    // si la profession no es null o vacia, actualizamos la profession en la base de datos
                    await db.Profession.update(profession, { where: { id: profession.id } })
                }
            }))

            // retornamos como promesa resuelta
            return resolve(true);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al actualizar las professiones: ' + error.message);
        }
    })
}

/**
 * Eliminar una o varias professiones por id del aspirante
 * Elimina las professiones relacionadas a un Aspirante
 * @param {*} object Objeto con el id del aspirante
 * @returns {Promise}
 */
professionService.delete = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos el id del aspirante con desestructuración
            const { candidate_id } = object;

            // si no viene el id del aspirante retornamos un error
            if (!candidate_id) throw new Error('ID del aspirante es requerido');

            // eliminamos las professiones con el id del aspirante
            await db.Profession.destroy({ where: { candidate_id: candidate_id } });

            // retornamos la variable como promesa resuelta
            return resolve(true);
            
        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al eliminar las professiones: ' + error.message);
        }
    })
}

/**
 * Obtener las condicones para filtrar por las profesiones en base a los query params
 * @param {*} object Objeto con los query params
 * @returns {Object} 
 */
professionService.whereConditions = (query) => {
    // extraemos los query params con desestructuración
    // en caso de que no vengan los query params retornamos null por defecto
    const { profession = null } = query;

    // creamos un objeto con los query params para la condición where de las Profesiónes
    let professionConditions = {};
    if (profession) professionConditions.profession = { [Op.like]: `%${profession}%` };
    
    // si no hay query params para la condición where de las profesiones retornamos como undefined
    if (Object.keys(professionConditions).length === 0) professionConditions = undefined;

    return { professionConditions }
}

module.exports = professionService;