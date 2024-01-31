const db = require('../database/models');
const professionsController = {};

professionsController.list = async (req, res) => {
    try {
        const professions = await db.Profession.findAll({
            include: [
                {
                    association: "candidate",
                    attributes: ['name'],
                }
            ]
        });

        return res.status(200).json({
            status: 200,
            message: 'List of profession',
            data: professions
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
}

module.exports = professionsController;