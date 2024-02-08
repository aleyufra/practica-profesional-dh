const { Router } = require('express');
const candidatesController = require('../controllers/candidates.controller.js');
const { createValidation, updateValidation } = require('../validations/candidates.validation.js');
const multer = require('multer');

const router = Router();

/** configuracion de multer */
// let multerDiskStorage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './public/img/productImages');
//     },
//     filename: (req, file, callback) => {
//         let imageName = 'prod-' + Date.now() + path.extname(file.originalname);
//         callback(null, imageName);
//     }
// })
// let fileProdUpload = multer({ storage: multerDiskStorage });

// Lista de candidatos

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', candidatesController.list);

// Detalle de un candidato
router.get('/:id', candidatesController.detail);

// Crear un nuevo candidato
router.post('/create', upload.single('image'), createValidation, candidatesController.create);

// Actualizar un candidato
router.patch('/update/:id', updateValidation, candidatesController.update);

// Eliminar un candidato
router.delete('/delete/:id', candidatesController.delete);


module.exports = router;