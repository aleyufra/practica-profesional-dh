const { Router } = require('express');
const router = Router();

const professionsController = require( '../controllers/professions.controller.js');

router.get('/', professionsController.list);


module.exports = router;