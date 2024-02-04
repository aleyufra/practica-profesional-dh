const db = require('../database/models');
const socialNetworkService = {};

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

socialNetworkService.update = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { socialNetworks = {}, candidate_id } = object;
            const { linkedin, facebook, twitter, instagram } = socialNetworks;

            // si no viene el id del aspirante retornamos un error
            if (!candidate_id) throw new Error('ID del aspirante es requerido');

            let fieldsToUpdate = { candidate_id: candidate_id };
            if (linkedin && linkedin !== '') fieldsToUpdate.linkedin = linkedin;
            if (facebook) fieldsToUpdate.facebook = facebook;
            if (twitter) fieldsToUpdate.twitter = twitter;
            if (instagram) fieldsToUpdate.instagram = instagram;

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


module.exports = socialNetworkService;