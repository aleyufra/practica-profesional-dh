const db = require('../database/models');
const candidatesController = {};

candidatesController.list = async (req, res) => {
    try {
        const candidates = await db.Candidate.findAll();

        return res.status(200).json({
            status: 200,
            message: 'List of candidates',
            data: candidates
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Internal server error'
        })
    }
}

module.exports = candidatesController;