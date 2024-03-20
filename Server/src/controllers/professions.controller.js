const db = require("../database/models");
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;
const paginationHelper = require("../utils/paginationHelper.function.js");
const candidateService = require("../services/candidate.service.js");
const professionService = require("../services/profession.service.js");

const professionsController = {};

/**
 * Listar todas las profesiones de la base de datos
 * Con paginación y filtrado por nombre de profesión
 * @param {*} req Objeto con los query params
 * @param {*} res Objeto con la respuesta
 */
professionsController.list = async (req, res) => {
	try {
		// extraemos los query params de la url con desestructuración
		const { page = 1 } = req.query;

		let conditions = {};
		// creamos un objeto con los query params para la condición where
		professionService.whereConditions(conditions, req.query);

		// buscamos las profesiones en la base de datos para sacar la longitud
		const professionsFounds = await db.Profession.findAll({
			where: conditions,
			attributes: [
				[
					Sequelize.fn("DISTINCT", Sequelize.col("profession")),
					"profession",
				],
			],
			raw: true,
		});

		// limite de profesiones por página
		const limit = 5;

		// Resultados de los profesiones encontrados
		const results = professionsFounds.length;

		// calculamos el total de páginas, pagina actual y offset
		const { totalPages, currentPage, offset } = paginationHelper(
			page,
			limit,
			results
		);

		// buscamos las profesiones con las query params proporcionados
		const foundProfessions = await db.Profession.findAll({
			where: conditions,
			attributes: [
				[
					Sequelize.fn("DISTINCT", Sequelize.col("profession")),
					"profession",
				],
			],
			limit: limit,
			offset: offset,
		});

		// retornamos un status de 200 con las profesiones
		return res.status(200).json({
			meta: {
				status: 200,
				message: "Lista de profesiones",
				results: results,
				totalPages: totalPages,
				currentPage: currentPage,
			},
			data: foundProfessions,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			meta: {
				status: 500,
				message: "Error interno del servidor",
				error: error.message,
			},
			data: [],
		});
	}
};

module.exports = professionsController;
