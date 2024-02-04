const db = require('../database/models');
const Op = db.Sequelize.Op;
const professionsController = {};

professionsController.list = async (req, res) => {
    try {
        console.log('query', req.query);
        // extraemos los query params de la url con desestructuración
        // en caso de que no exista el query params devolverá un objeto vacío
        const {
            page = 1,
            profession = '',
            name = '',
            surname = '',
            gender = '',
        } = req.query;

        // limite de profesiones por página
        const limit = 4;

        // calculamos el total de profesiones
        const { count } = await db.Profession.findAndCountAll();

        // calculamos el total de páginas
        const totalPages = Math.ceil(count / limit);

        // calculamos el número de página
        let pageNumber = 1;
        pageNumber = page === '' ? 1 : parseInt(page);
        pageNumber = pageNumber < 1 ? 1 : pageNumber;
        pageNumber = pageNumber > totalPages ? totalPages : pageNumber;

        // calculamos el offset
        const offset = limit * (pageNumber - 1);

        // asignamos el numero de pagina actual
        const currentPage = pageNumber;

        // filtramos las profesiones con las query params proporcionados
        const foundProfessions = await db.Profession.findAll({
            where: {
                profession: { [Op.like]: `%${profession}%` }
            },
            include: [{
                association: "candidate",
                where: {
                    name: { [Op.like]: `%${name}%` },
                    surname: { [Op.like]: `%${surname}%` },
                    gender: { [Op.like]: `%${gender}%` }
                },
                attributes: ['id', 'name', 'surname']
            }],
            limit: limit,
            offset: offset
        });

        // retornamos las profesiones
        return res.status(200).json({
            status: 200,
            message: 'List of professions',
            total: count,
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