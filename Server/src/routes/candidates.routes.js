const { Router } = require('express');
const router = Router();

const candidatesController = require('../controllers/candidates.controller.js');

router.get('/', candidatesController.list);


module.exports = router;