const db = require('../database/models');
const Op = db.Sequelize.Op;
const candidatesController = {};

/**
 * Listar todos los aspirantes 
 */
candidatesController.list = async (req, res) => {
    try {
        // Buscar todos los aspirantes
        const candidates = await db.Candidate.findAll({
            include: [
                { association: "professions" },
                { association: "social_networks" }
            ],
        });

        if (candidates.length === 0) {
            // En caso de que no exista aspirantes
            return res.status(404).json({
                status: 404,
                message: 'Lista de aspirantes vacia',
                data: []
            })
        } else {
            // En caso de que exista aspirantes
            return res.status(200).json({
                status: 200,
                message: 'Lista de aspirantes',
                data: candidates
            })
        }
    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error
        });
    }
};

/**
 * Listar un Aspirante por su id
 */
candidatesController.detail = async (req, res) => {
    try {
        // Buscamos el aspirante por su id
        const { id } = req.params;
        const candidateFound = await db.Candidate.findByPk(id, {
            include: [{ association: 'professions' }, { association: 'social_networks' }]
        });

        if (candidateFound === null) {
            // En caso de que no exista
            return res.status(404).json({
                status: 404,
                message: 'Aspirante no encontrado',
                data: []
            })
        } else {
            // En caso de que exista
            return res.status(200).json({
                status: 200,
                message: 'Aspirante encontrado',
                data: candidateFound
            })
        }
    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor'
        });
    }
}

/**
 * Crear un nuevo Aspirante
 */
candidatesController.create = async (req, res) => {
    // Creamos constantes usando la desestructuración
    const { dni, name, surname, email, phone, birthday, gender, image } = req.body;
    const { professions, linkedin } = req.body;

    // Verificamos que todos los campos esten completos
    if (!dni || !name || !surname || !email || !birthday || !gender || !image || !professions || !Array.isArray(professions) || professions.length === 0 || !linkedin) {
        return res.status(400).json({
            status: 400,
            message: 'Todos los campos son requeridos',
            data: []
        })
    }

    try {
        // Creamos y guardamos el nuevo Aspirante en la base de datos
        const candidateCreated = await db.Candidate.create({
            dni,
            name,
            surname,
            email,
            phone: phone || null,
            birthday,
            gender,
            image
        });

        // Creamos un array de objetos de profesiones con los campos necesarios
        // filtrando aquellos que tengan un nombre de profesión no nula por seguridad
        const professionsToCreate = professions.map(item => {
            const newProfession = {
                profession: item.profession ? item.profession : null,
                candidate_id: candidateCreated.id
            }
            return newProfession;
        }).filter(item => item.profession !== null)

        // Guardamos varios objetos de profesiones en la base de datos con bulkCreate
        await db.Profession.bulkCreate(professionsToCreate);

        // Guardamos los atributos a la tabla de redes sociales
        await db.SocialNetwork.create({
            linkedin,
            candidate_id: candidateCreated.id
        });

        // Buscamos el Aspirante en la base de datos por su id
        const candidateFound = await db.Candidate.findByPk(candidateCreated.id, {
            include: [{ association: "professions" }, { association: "social_networks" }]
        });

        // Retornamos la response 201 creado
        return res.status(201).json({
            status: 201,
            message: 'Aspirante creado',
            data: candidateFound
        });

    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error
        });
    }
}

/**
 * Actualizar un Aspirante por su id
 */
candidatesController.update = async (req, res) => {
    // Creamos constantes de los campos que vamos a actualizar
    const { dni, name, surname, email, phone, birthday, gender, image } = req.body;
    const { professions, linkedin } = req.body;

    // Validacion de los campos que no pueden ser nulos
    if (dni === null || name === null || surname === null || email === null || birthday === null || gender === null || image === null || !Array.isArray(professions) || professions.length === 0 || linkedin === null) {
        return res.status(400).json({
            status: 400,
            message: 'Todos los campos son requeridos',
            data: []
        })
    }

    try {
        // Verificamos si el Aspirante existe
        const { id } = req.params;
        const candidateExists = await db.Candidate.findByPk(id);
        console.log(candidateExists);
        if (candidateExists === null) {
            // Si no existe retornamos la response 404 no encontrado
            return res.status(404).json({
                status: 404,
                message: 'Aspirante no encontrado',
                data: []
            })
        }

        /** PARA LA TABLA DE CANDIDATES: */
        // Creamos un objeto con los campos que se hayan proporcionado
        // para luego usarlos para actualizar al Aspirante
        let updateFields = {};
        if (dni) updateFields.dni = dni;
        if (name) updateFields.name = name;
        if (surname) updateFields.surname = surname;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (birthday) updateFields.birthday = birthday;
        if (gender) updateFields.gender = gender;
        if (image) updateFields.image = image;

        // Actualizamos el Aspirante
        await db.Candidate.update(updateFields, { where: { id } });


        /** PARA LA TABLA DE PROFESSIONS: */
        // En caso de que se pase un array de objetos de profesiones en el body
        if (professions) {
            // Aseguramos que las profesiones sean un JSON
            const professionsJSON = JSON.stringify(professions);
            // Parseamos a un array de objetos de profesiones y agregamos el candidate_id
            const professionsPARSED = JSON.parse(professionsJSON).map(item => ({
                // retornamos el objeto con estos atributos por seguridad
                // si contienen id es porque ya existian en la base de datos
                id: item.id ? item.id : null,
                profession: item.profession ? item.profession : null,
                candidate_id: id
            }))

            // Creamos un array de objetos de profesiones que SI y NO existen en la base de datos
            const existingProfessions = professionsPARSED.filter(item => item.id !== null);
            const nonExistingProfessions = professionsPARSED.filter(item => item.id === null);

            // Creamos solo las profesiones que no sean null en la base de datos
            await Promise.all(nonExistingProfessions.map(async (profession) => {
                if (profession.profession !== null) {
                    await db.Profession.create(profession);
                }
            }))

            // Actualizamos las profesiones que si existen en la base de datos
            await Promise.all(existingProfessions.map(async (profession) => {
                if (profession.profession === null) {
                    // Eliminamos la profesiones que sean null
                    await db.Profession.destroy({ where: { id: profession.id } })
                } else {
                    // Actualizamos las profesiones que NO sean null
                    await db.Profession.update(profession, { where: { id: profession.id } })
                }
            }))
        }

        /** PARA LA TABLA DE SOCIAL_NETWORKS: */
        // En caso de que se pase un link de LinkedIn. 
        // TODO: se supone que ya se verifico que no sea null utilizando express-validator
        if (linkedin) {
            // Actualizamos el link de LinkedIn
            await db.SocialNetwork.update(
                { linkedin: linkedin },
                { where: { candidate_id: id } }
            );
        }

        // Buscamos el Aspirante en la base de datos por su id
        const candidateFound = await db.Candidate.findByPk(id, {
            include: [
                { association: 'professions' },
                { association: 'social_networks' }
            ]
        })

        // Retornamos la response 200 y el Aspirante actualizado
        return res.status(200).json({
            status: 200,
            message: 'Aspirante actualizado',
            data: candidateFound
        })
    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error
        });
    }
}


module.exports = candidatesController;