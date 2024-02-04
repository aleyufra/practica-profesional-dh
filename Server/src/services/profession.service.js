const db = require('../database/models');

const professionService = {};

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

professionService.update = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { professions, candidate_id } = object;

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


module.exports = professionService;