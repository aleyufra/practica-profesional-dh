const db = require('../database/models');
const Op = db.Sequelize.Op;
const paginationHelper = require('../utils/paginationHelper.function.js');
const candidateService = require('../services/candidate.service.js');
const professionService = require('../services/profession.service.js');

const professionsController = {};

/**
 * Listar todas las profesiones de la base de datos
 * Con paginación y filtrado por profesión, nombre, apellido o genero
 * @param {*} req Objeto con los query params
 * @param {*} res Objeto con la respuesta
 */
professionsController.list = async (req, res) => {
    try {
        // extraemos los query params de la url con desestructuración
        const { page = 1 } = req.query;

        // limite de profesiones por página
        const limit = 4;

        // creamos un objeto con los query params para la condición where
        const { candidateConditions } = candidateService.whereConditions(req.query);
        const { professionConditions } = professionService.whereConditions(req.query);

        // calculamos el total de profesiones
        const { rows } = await db.Profession.findAndCountAll({
            where: professionConditions,
            include: [
                { association: "candidate", where: candidateConditions },
            ],
        });

        // Resultados de los profesiones encontrados
        const results = rows.length;

        // calculamos el total de páginas, pagina actual y offset
        const { totalPages, currentPage, offset } = paginationHelper(page, limit, results);

        // filtramos las profesiones con las query params proporcionados
        const foundProfessions = await db.Profession.findAll({
            where: professionConditions,
            include: [
                {
                    association: "candidate",
                    where: candidateConditions,
                    attributes: ['id', 'name', 'surname'],
                    include: [
                        {
                            association: "social_networks",
                            attributes: ['linkedin']
                        }
                    ]
                }
            ],
            limit: limit,
            offset: offset
        });

        // retornamos un status de 200 con las profesiones
        return res.status(200).json({
            status: 200,
            message: 'Lista de profesiones',
            results: results,
            totalPages: totalPages,
            currentPage: currentPage,
            data: foundProfessions,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

module.exports = professionsController;