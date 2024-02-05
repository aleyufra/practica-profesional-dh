const db = require('../database/models');
const Op = db.Sequelize.Op;
const paginationHelper = require('../utils/paginationHelper.function.js');
const candidateService = require('../services/candidate.service.js');
const professionService = require('../services/profession.service.js');
const socialNetworkService = require('../services/socialNetwork.service.js');

const candidatesController = {};

/**
 * Listar todos los aspirantes de la base de datos
 * Con paginación y filtrado por nombre, apellido, genero, profesión o por red social
 * @param {*} req Objeto con los query params
 * @param {*} res Objeto con la respuesta
 */
candidatesController.list = async (req, res) => {
    try {
        // extraemos los query params de la url con desestructuración
        const { page = 1 } = req.query;

        // creamos un objeto con los query params para la condición where
        const { candidateConditions } = candidateService.whereConditions(req.query);
        const { professionConditions } = professionService.whereConditions(req.query);
        const { socialNetoworkConditions } = socialNetworkService.whereConditions(req.query);

        // limite de profesiones por página
        const limit = 4;

        // calculamos el total de aspirantes
        const { rows } = await db.Candidate.findAndCountAll({
            where: candidateConditions,
            include: [
                { association: 'professions', where: professionConditions },
                { association: 'social_networks', where: socialNetoworkConditions }
            ]
        });

        // Resultados de los aspirantes encontrados
        const results = rows.length;

        // calculamos el total de páginas, pagina actual y offset
        const { totalPages, currentPage, offset } = paginationHelper(page, limit, results);

        // filtramos las profesiones con las query params proporcionados
        const foundCandidates = await db.Candidate.findAll({
            where: candidateConditions,
            include: [
                { association: 'professions', where: professionConditions },
                { association: 'social_networks', where: socialNetoworkConditions }
            ],
            limit: limit,
            offset: offset,
        });

        // retornamos las profesiones
        return res.status(200).json({
            status: 200,
            message: 'Lista de aspirantes',
            results: results,
            totalPages: totalPages,
            currentPage: currentPage,
            data: foundCandidates,
        })

    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Listar un Aspirante por su id
 * @param {*} req Objeto con el id del aspirante
 * @param {*} res Objeto con la respuesta
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
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

/**
 * Crear un nuevo Aspirante
 * Se crea una nueva fila en la tabla de aspirantes, de profesiones y redes
 * @param {*} req.body Objeto con los campos id, dni, name, surname, email, phone, birthday, gender, image, profession, socialNetworks
 * @param {*} res Objeto con la respuesta
 */
candidatesController.create = async (req, res) => {
    // Creamos los campos necesarios usando la desestructuración
    const {
        dni = null,
        name = null,
        surname = null,
        email = null,
        phone = null,
        birthday = null,
        gender = null,
        image = null,
        professions = [],
        socialNetworks = {}
    } = req.body;

    try {
        // Creamos un nuevo aspirante en la base de datos
        const createdCandidate = await candidateService.create({
            dni, name, surname, email, phone, birthday, gender, image
        })

        // Creamos las profesiones del aspirante
        await professionService.create({
            professions: professions, candidate_id: createdCandidate.id
        })

        // Creamos las redes sociales del aspirante
        await socialNetworkService.create({
            socialNetworks: socialNetworks, candidate_id: createdCandidate.id
        })

        // Buscamos el Aspirante en la base de datos por su id
        const candidateFound = await db.Candidate.findByPk(createdCandidate.id, {
            include: [
                { association: "professions" },
                { association: "social_networks" }
            ]
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
            error: error.message
        });
    }
}

/**
 * Actualizar un Aspirante por su id
 * Se actualizan los campos del aspirante proporcionados
 * @param {*} req Objeto con el id del aspirante
 * @param {*} res Objeto con la respuesta
 */
candidatesController.update = async (req, res) => {
    // Creamos constantes de los campos que vamos a actualizar
    const {
        dni = null,
        name = null,
        surname = null,
        email = null,
        phone = null,
        birthday = null,
        gender = null,
        image = null,
        professions = [],
        socialNetworks = {}
    } = req.body;
    console.log('body en controller', req.body);

    try {
        // Verificamos si el Aspirante existe
        const { id } = req.params;
        const candidateExists = await db.Candidate.findByPk(id);

        // Si no existe retornamos la response 404 no encontrado
        if (candidateExists === null) {
            return res.status(404).json({
                status: 404,
                message: 'Aspirante no encontrado',
                data: []
            })
        }

        // actualizamos el candidato en la base de datos
        await candidateService.update({
            id, dni, name, surname, email, phone, birthday, gender, image
        })

        // actualizamos la/s profesion/es del candidato
        await professionService.update({
            professions: professions, candidate_id: id
        })

        // actualizamos la/s redes sociales del candidato
        await socialNetworkService.update({
            socialNetworks: socialNetworks, candidate_id: id
        })

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
            error: error.message
        });
    }
}

/**
 * Eliminar un Aspirante por su id
 * Elimina las professiones y las redes relacionadas a un Aspirante
 * @param {*} req Objeto con el id del aspirante
 * @param {*} res Objeto con la respuesta
 */
candidatesController.delete = async (req, res) => {
    try {
        // Buscamos el aspirante por su id
        const { id } = req.params;
        const candidateFound = await db.Candidate.findByPk(id, {
            include: [{ association: 'professions' }, { association: 'social_networks' }]
        });

        // En caso de que no exista retornamos la response 404 no encontrado
        if (candidateFound === null) {
            return res.status(404).json({
                status: 404,
                message: 'Aspirante no encontrado',
                data: []
            })
        }

        // Eliminamos las redes y profesiones del aspirante
        await socialNetworkService.delete({ candidate_id: id });
        await professionService.delete({ candidate_id: id });

        // Eliminamos el aspirante de la base de datos
        await candidateService.delete({ id });

        // Retornamos la response 200 y el aspirante eliminado
        return res.status(200).json({
            status: 200,
            message: 'Aspirante eliminado',
            data: candidateFound
        })

    } catch (error) {
        // En caso de error
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}


module.exports = candidatesController;