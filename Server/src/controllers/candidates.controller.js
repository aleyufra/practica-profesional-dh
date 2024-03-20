const db = require("../database/models");
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;
const paginationHelper = require("../utils/paginationHelper.function.js");
const candidateService = require("../services/candidate.service.js");
const professionService = require("../services/profession.service.js");
const socialNetworkService = require("../services/socialNetwork.service.js");

const candidatesController = {};

/**
 * Listar todos los aspirantes de la base de datos
 * Con paginación y filtrado por nombre, apellido, genero, profesión o por red social
 * @param {*} req Objeto con los query params
 * @param {*} res Objeto con la respuesta
 */
candidatesController.list = async (req, res) => {
	try {
		// Extraemos las queries
		const { page = 1 } = req.query;

		// Limit de Paginado
		const limit = 6;

		// Condiciones de búsqueda
		let conditions = {};
		candidateService.whereConditions(conditions, req.query);

		const count = await db.Candidate.count({
			include: [
				{ association: "Profession" },
				{ association: "SocialNetwork" },
			],
			where: conditions,
			distinct: true,
		});

		// Total de Aspirantes
		const totalCandidates = count;

		// Recursos para el paginado
		const { totalPages, currentPage, offset } = paginationHelper(
			page,
			limit,
			totalCandidates
		);

		// Buscamos los Aspirantes segun las conditions proporcionados
		const foundCandidates = await db.Candidate.findAll({
			where: conditions,
			include: [
				{ association: "Profession" },
				{ association: "SocialNetwork" },
			],
			limit: limit,
			offset: offset,
			subQuery: true,
			// sin subQuery = false nos da error de no encontrar
			// la columna '$professions.profession$' al colocar el limit
		});

		return res.status(200).json({
			meta: {
				status: res.statusCode,
				error: false,
				message: "Lista de aspirantes",
				results: totalCandidates,
				totalPages: totalPages,
				currentPage: currentPage,
				url: res.req.originalUrl,
			},
			data: foundCandidates,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			meta: {
				status: res.statusCode,
				error: true,
				message: "Error interno del servidor",
				errorMessage: error.message,
				url: res.req.originalUrl,
			},
			data: [],
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
			include: [
				{ association: "Profession" },
				{ association: "SocialNetwork" },
			],
		});

		// En caso de que no exista
		if (candidateFound === null) {
			return res.status(404).json({
				meta: {
					status: 404,
					message: "Aspirante no encontrado",
				},
				data: [],
			});
		}

		// En caso de que si exista
		return res.status(200).json({
			meta: {
				status: 200,
				message: "Aspirante encontrado",
			},
			data: candidateFound,
		});
	} catch (error) {
		// En caso de error
		console.log(error);
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
		socialNetworks = {},
	} = req.body;

	try {
		const createdCandidate = await candidateService.create({
			dni,
			name,
			surname,
			email,
			phone,
			birthday,
			gender,
			image,
		});

		await professionService.create({
			professions: professions,
			candidate_id: createdCandidate.id,
		});

		await socialNetworkService.create({
			socialNetworks: socialNetworks,
			candidate_id: createdCandidate.id,
		});

		const candidateFound = await db.Candidate.findByPk(
			createdCandidate.id,
			{
				include: [
					{ association: "Profession" },
					{ association: "SocialNetwork" },
				],
			}
		);

		// Retornamos la response 201 creado
		return res.status(201).json({
			meta: {
				status: 201,
				message: "Aspirante creado",
			},
			data: candidateFound,
		});
	} catch (error) {
		// En caso de error
		console.log(error);
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

/**
 * Actualizar un Aspirante por su id
 * Se actualizan los campos del aspirante proporcionados
 * @param {*} req Objeto con el id del aspirante
 * @param {*} res Objeto con la respuesta
 */
candidatesController.update = async (req, res) => {
	// Creamos constantes de los campos que vamos a actualizar
	const {
		dni,
		name,
		surname,
		email,
		phone,
		birthday,
		gender,
		image,
		professions,
		socialNetworks,
	} = req.body;

	try {
		const { id } = req.params;
		const candidateExists = await db.Candidate.findByPk(id);

		if (candidateExists === null) {
			return res.status(404).json({
				meta: {
					status: 404,
					message: "Aspirante no encontrado",
				},
				data: [],
			});
		}

		await candidateService.update({
			id,
			dni,
			name,
			surname,
			email,
			phone,
			birthday,
			gender,
			image,
		});

		await professionService.update({
			professions: professions,
			candidate_id: id,
		});

		await socialNetworkService.update({
			socialNetworks: socialNetworks,
			candidate_id: id,
		});

		const candidateFound = await db.Candidate.findByPk(id, {
			include: [
				{ association: "Profession" },
				{ association: "SocialNetwork" },
			],
		});

		return res.status(200).json({
			meta: {
				status: 200,
				message: "Aspirante actualizado",
			},
			data: candidateFound,
		});
	} catch (error) {
		console.log(error);
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
			include: [
				{ association: "Profession" },
				{ association: "SocialNetwork" },
			],
		});

		// En caso de que no exista retornamos la response 404 no encontrado
		if (candidateFound === null) {
			return res.status(404).json({
				meta: {
					status: 404,
					message: "Aspirante no encontrado",
				},
				data: [],
			});
		}

		// Eliminamos las redes y profesiones del aspirante
		await socialNetworkService.delete({ candidate_id: id });
		await professionService.delete({ candidate_id: id });

		// Eliminamos el aspirante de la base de datos
		await candidateService.delete({ id });

		// Retornamos la response 200 y el aspirante eliminado
		return res.status(200).json({
			meta: {
				status: 200,
				message: "Aspirante eliminado",
			},
			data: candidateFound,
		});
	} catch (error) {
		// En caso de error
		console.log(error);
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

module.exports = candidatesController;
