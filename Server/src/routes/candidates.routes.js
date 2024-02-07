const { Router } = require('express');
const candidatesController = require('../controllers/candidates.controller.js');
const { createValidation, updateValidation } = require('../validations/candidates.validation.js');

const router = Router();

// Lista de candidatos
router.get('/', candidatesController.list);

// Detalle de un candidato
router.get('/:id', candidatesController.detail);

// Crear un nuevo candidato
router.post('/create', createValidation, candidatesController.create);

// Actualizar un candidato
router.patch('/update/:id', updateValidation, candidatesController.update);

// Eliminar un candidato
router.delete('/delete/:id', candidatesController.delete);


module.exports = router;