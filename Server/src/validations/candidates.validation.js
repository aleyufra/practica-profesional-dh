const { body, validationResult } = require('express-validator');
const db = require('../database/models');

const createValidation = [
    body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ min: 2 }).withMessage('El nombre debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El nombre debe ser de maximo 50 caracteres'),

    body('surname')
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .isLength({ min: 2 }).withMessage('El apellido debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El apellido debe ser de maximo 50 caracteres'),

    body('dni')
        .notEmpty().withMessage('El dni es requerido')
        .isNumeric().withMessage('El dni debe ser un numérico'),

    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un formato valido').bail()
        .custom(async (value) => {
            const existingUser = await db.Candidate.findOne({ where: { email: value } });
            if (existingUser !== null) {
                throw new Error('El email ya existe');
            }
            return true;
        }),

    body('phone')
        .optional(),

    body('birthday')
        .notEmpty().withMessage('La fecha es requerida'),
    // .isDate({ format: "YYYY-MM-DD" }).withMessage('La fecha debe ser un formato valido'),

    body('gender')
        .notEmpty().withMessage('El genero es requerido')
        .isString().withMessage('El genero debe ser una cadena de texto')
        .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El genero debe ser Masculino, Femenino u Otro'),

    body('image')
        .notEmpty().withMessage('La imagen es requerida')
        .isString().withMessage('La imagen debe ser una cadena de texto'),
    // .isURL().withMessage('La imagen debe ser una url'),

    body('professions')
        .notEmpty().withMessage('Las profesiones son requeridas')
        .isArray().withMessage('Las profesiones debe ser un array'),

    body('socialNetworks')
        .isObject().withMessage('Las redes sociales debe ser un objeto'),

    body('socialNetworks.linkedin')
        .optional()
        .isString().withMessage('El enlace de LinkedIn debe ser una cadena de texto'),

    body('socialNetworks.facebook')
        .optional()
        .isString().withMessage('El enlace de Facebook debe ser una cadena de texto'),

    // Middleware para la validacion de los campos y transformacion de algunos datos
    (req, res, next) => {
        console.log('body', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.mapped()
            });
        }
        req.body.dni = req.body.dni.toString();
        req.body.phone = req.body.phone ? req.body.phone.toString() : null;

        next();
    }
]

module.exports = {
    createValidation
}