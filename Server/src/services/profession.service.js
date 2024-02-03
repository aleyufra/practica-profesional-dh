const db = require('../database/models');

const professionService = {};

professionService.createProfessions = async (object) => {
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
            const createdProfessions = await db.Profession.bulkCreate(professionsToCreate);
            
            // retornamos la variable como promesa resuelta
            return resolve(createdProfessions);

        } catch (error) {
            // en caso de error retornamos la variable como promesa rechazada
            return reject(error);
        }
    })
}


module.exports = professionService;