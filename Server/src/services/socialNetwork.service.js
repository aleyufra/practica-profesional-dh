const db = require('../database/models');
const socialNetworkService = {};

/**
 * Crear las redes sociales con el id del aspirante con los campos proporsionados
 * @param {*} object Objeto con los campos de redes sociales e id del aspirante
 * @returns {Promise}
 */
socialNetworkService.create = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { socialNetworks = {}, candidate_id } = object;
            const { linkedin, facebook, twitter, instagram } = socialNetworks;

            // si no viene el id del aspirante retornamos un error
            if (!candidate_id) throw new Error('ID del aspirante es requerido');

            // creamos las redes con los campos extraidos y lo guardamos en una variable
            const newSocialNetworks = await db.SocialNetwork.create({
                linkedin: linkedin,
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                candidate_id: candidate_id
            });

            // retornamos la variable como promesa resuelta
            return resolve(newSocialNetworks.dataValues);

        } catch (error) {
            // en caso de error retornamos la variable como promesa rechazada
            return reject('Error al crear las redes sociales: ' + error.message);
        }
    })
}

/**
 * Actualizar redes sociales por id del aspirante con los campos proporsionados
 * @param {*} object Objeto con los campos de redes e id del aspirante
 * @returns {Promise}
 */
socialNetworkService.update = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { socialNetworks = {}, candidate_id } = object;
            const { linkedin, facebook, twitter, instagram } = socialNetworks;

            // si no viene el id del aspirante retornamos un error
            if (!candidate_id) throw new Error('ID del aspirante es requerido');

            // creamos un objeto con los campos que se hayan proporcionado
            let fieldsToUpdate = { candidate_id: candidate_id };
            if (linkedin && linkedin !== '') fieldsToUpdate.linkedin = linkedin;

            if (facebook) fieldsToUpdate.facebook = facebook;
            if (facebook === '') fieldsToUpdate.facebook = null;

            if (twitter) fieldsToUpdate.twitter = twitter;
            if (twitter === '') fieldsToUpdate.twitter = null;
            
            if (instagram) fieldsToUpdate.instagram = instagram;
            if (instagram === '') fieldsToUpdate.instagram = null;

            // actualizamos las redes con los campos extraidos y lo guardamos en una variable
            await db.SocialNetwork.update(fieldsToUpdate,
                { where: { candidate_id: candidate_id } }
            );

            // retornamos la variable como promesa resuelta
            return resolve(true);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al actualizar las redes sociales: ' + error.message);
        }
    })
}

/**
 * Eliminar un Aspirante por su id
 * Elimina las redes sociales relacionadas a un Aspirante
 * @param {*} object Objeto con las redes e id del aspirante
 * @returns {Promise}
 */
socialNetworkService.delete = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { candidate_id } = object;

            // si no viene el id del aspirante retornamos un error
            if (!candidate_id) throw new Error('ID del aspirante es requerido');

            // eliminamos las redes con el id del aspirante
            await db.SocialNetwork.destroy({ where: { candidate_id: candidate_id } });

            // retornamos la variable como promesa resuelta
            return resolve(true);

        } catch (error) {
            // en caso de error retornamos como promesa rechazada
            return reject('Error al borrar las redes sociales: ' + error.message);
        }
    })
}

/**
 * Obtener las condicones para filtrar por redes sociales en base a los query params
 * @param {*} object Objeto con los query params
 * @returns {Object} 
 */
socialNetworkService.whereConditions = (query) => {
    // extraemos los query params con desestructuración
    // en caso de que no vengan los query params retornamos null por defecto
    const { linkedin = null } = query;

    // creamos un objeto con los query params para la condición where de la Redes Sociales
    let socialNetoworkConditions = {};
    if (linkedin) socialNetoworkConditions.linkedin = { [Op.like]: `%${linkedin}%` };

    // si no hay query params para la condición where de la Redes Sociales retornamos como undefined
    if (Object.keys(socialNetoworkConditions).length === 0) socialNetoworkConditions = undefined;

    return { socialNetoworkConditions }
}

module.exports = socialNetworkService;