const db = require('../database/models');
const socialNetworkService = {};

socialNetworkService.createSocialNetworks = async (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extraemos los campos del objeto con desestructuración
            const { socialNetworks, candidate_id } = object;
            const { linkedin, facebook, twitter, instagram } = socialNetworks;
            
            // creamos un objeto con los campos extraidos que existan
            let socialNetworksFields = { candidate_id: candidate_id };
            if (linkedin) socialNetworksFields.linkedin = linkedin;
            if (facebook) socialNetworksFields.facebook = facebook;
            if (twitter) socialNetworksFields.twitter = twitter;
            if (instagram) socialNetworksFields.instagram = instagram;

            // creamos el candidato con los campos extraidos y lo guardamos en una variable
            const newSocialNetworks = await db.SocialNetwork.create(socialNetworksFields);

            // retornamos la variable como promesa resuelta
            return resolve(newSocialNetworks);

        } catch (error) {
            // en caso de error retornamos la variable como promesa rechazada
            return reject(error);
        }
    })
}


module.exports = socialNetworkService;