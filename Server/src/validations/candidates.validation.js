const { body, validationResult } = require('express-validator');
const db = require('../database/models');

const createValidation = [
    body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ min: 2 }).withMessage('El nombre debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El nombre debe ser de maximo 50 caracteres'),

    body('surname')
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .trim()
        .isLength({ min: 2 }).withMessage('El apellido debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El apellido debe ser de maximo 50 caracteres'),

    body('dni')
        .notEmpty().withMessage('El dni es requerido')
        .isNumeric().withMessage('El dni debe ser un numérico'),

    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isString().withMessage('El email debe ser una cadena de texto')
        .trim()
        .isLength({ min: 10 }).withMessage('El email debe ser de al menos 10 caracteres')
        .isLength({ max: 50 }).withMessage('El email debe ser de maximo 50 caracteres')
        .isEmail().withMessage('El email debe ser un formato valido').bail()
        .custom(async (value) => {
            const existingUser = await db.Candidate.findOne({ where: { email: value } });
            if (existingUser !== null) {
                throw new Error('El email ya existe');
            }
            return true;
        }),

    body('phone')
        .optional({ nullable: true })
        .isNumeric().withMessage('El dni debe ser un numérico'),

    body('birthday')
        .notEmpty().withMessage('La fecha es requerida'),
    // .isDate({ format: "YYYY-MM-DD" }).withMessage('La fecha debe ser un formato valido'),

    body('gender')
        .notEmpty().withMessage('El genero es requerido')
        .isString().withMessage('El genero debe ser una cadena de texto')
        .trim()
        .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El genero debe ser Masculino, Femenino u Otro'),

    body('image')
        .notEmpty().withMessage('La imagen es requerida')
        .isString().withMessage('La imagen debe ser una cadena de texto')
        .trim(),
    // .isURL().withMessage('La imagen debe ser una url'),

    body('professions')
        .notEmpty().withMessage('Las profesiones son requeridas')
        .isArray().withMessage('Las profesiones debe ser un array'),

    body('socialNetworks')
        .isObject().withMessage('Las redes sociales debe ser un objeto'),

    body('socialNetworks.linkedin')
        .notEmpty().withMessage('El enlace de LinkedIn es requerido')
        .isString().withMessage('El enlace de LinkedIn debe ser una cadena de texto')
        .trim()
        .isLength({ min: 6 }).withMessage('El link de LinkedIn debe ser de al menos 6 caracteres'),

    body('socialNetworks.facebook')
        .optional()
        .isString().withMessage('El nombre de Facebook debe ser una cadena de texto')
        .trim()
        .isLength({ min: 6 }).withMessage('El nombre de facebook debe ser de al menos 6 caracteres'),

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

        next();
    }
]

const updateValidation = [
    body('name')
        .optional()
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ min: 2 }).withMessage('El nombre debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El nombre debe ser de maximo 50 caracteres'),

    body('surname')
        .optional()
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .trim()
        .isLength({ min: 2 }).withMessage('El apellido debe ser de al menos 2 caracteres')
        .isLength({ max: 50 }).withMessage('El apellido debe ser de maximo 50 caracteres'),

    body('dni')
        .optional()
        .notEmpty().withMessage('El dni es requerido')
        .isNumeric().withMessage('El dni debe ser un numérico'),

    body('email')
        .optional()
        .notEmpty().withMessage('El email es requerido')
        .isString().withMessage('El email debe ser una cadena de texto')
        .trim()
        .isLength({ min: 10 }).withMessage('El email debe ser de al menos 10 caracteres')
        .isLength({ max: 50 }).withMessage('El email debe ser de maximo 50 caracteres')
        .isEmail().withMessage('El email debe ser un formato valido').bail()
        .custom(async (value) => {
            const existingUser = await db.Candidate.findOne({ where: { email: value } });
            if (existingUser !== null) {
                throw new Error('El email ya existe');
            }
            return true;
        }),

    body('phone')
        .optional({ nullable: true })
        .isNumeric().withMessage('El dni debe ser un numérico'),

    body('birthday')
        .optional()
        .notEmpty().withMessage('La fecha es requerida'),
        // .isDate({ format: "yyyy-mm-dd",}).withMessage('La fecha debe ser un formato valido'),

    body('gender')
        .optional()
        .notEmpty().withMessage('El genero es requerido')
        .isString().withMessage('El genero debe ser una cadena de texto')
        .trim()
        .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El genero debe ser Masculino, Femenino u Otro'),

    body('image')
        .optional()
        .notEmpty().withMessage('La imagen es requerida')
        .isString().withMessage('La imagen debe ser una cadena de texto')
        .trim(),
    // .isURL().withMessage('La imagen debe ser una url'),

    body('professions')
        .optional()
        .notEmpty().withMessage('Las profesiones son requeridas')
        .isArray().withMessage('Las profesiones debe ser un array'),

    body('socialNetworks')
        .optional()
        .isObject().withMessage('Las redes sociales debe ser un objeto'),

    body('socialNetworks.linkedin')
        .optional()
        .notEmpty().withMessage('El enlace de LinkedIn es requerido')
        .trim()
        .isLength({ min: 6 }).withMessage('El link de LinkedIn debe ser de al menos 6 caracteres')
        .isString().withMessage('El enlace de LinkedIn debe ser una cadena de texto'),

    body('socialNetworks.facebook')
        .optional()
        .isString().withMessage('El enlace de Facebook debe ser una cadena de texto')
        .trim(),

    // Middleware para la validacion de los campos y transformacion de algunos datos
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.mapped()
            });
        }
        console.log('body-middleware', req.body);

        next();
    }
]

module.exports = {
    createValidation,
    updateValidation
}