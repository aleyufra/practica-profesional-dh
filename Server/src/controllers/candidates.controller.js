const db = require('../database/models');
const Op = db.Sequelize.Op;
const candidateService = require('../services/candidate.service.js');
const professionService = require('../services/profession.service.js');
const socialNetworkService = require('../services/socialNetwork.service.js');

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
            error
        });
    }
}

/**
 * Actualizar un Aspirante por su id
 */
candidatesController.update = async (req, res) => {
    console.log('body en controller', req.body);
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

    try {
        // Verificamos si el Aspirante existe
        const { id } = req.params;
        const candidateExists = await db.Candidate.findByPk(id);
        if (candidateExists === null) {
            // Si no existe retornamos la response 404 no encontrado
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
            error: error
        });
    }
}


module.exports = candidatesController;