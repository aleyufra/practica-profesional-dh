const { Router } = require('express');
const router = Router();

const candidatesController = require('../controllers/candidates.controller.js');

// Lista de candidatos
router.get('/', candidatesController.list);

// Detalle de un candidato
router.get('/:id', candidatesController.detail);

// Crear un nuevo candidato
router.post('/create', candidatesController.create);

// Actualizar un candidato
router.patch('/update/:id', candidatesController.update);


module.exports = router;