const { body, validationResult } = require('express-validator')

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        return res.status(400).json({
            errors: errors.array()
        })
    }
}


// Registration validation
exports.validateRegistration = validate([
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
]);

// Login validation
exports.validateLogin = validate([
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .not().isEmpty().withMessage('Password is required')
]);

// Todo creation validation
exports.validateTodoCreate = validate([
    body('title')
        .trim()
        .isLength({ min: 1 }).withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),

    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),

    body('dueDate')
        .optional()
        .isISO8601().toDate().withMessage('Invalid date format')
]);

// Todo update validation
exports.validateTodoUpdate = validate([
    body('title')
        .optional()
        .trim()
        .isLength({ min: 1 }).withMessage('Title must not be empty')
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),

    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),

    body('dueDate')
        .optional()
        .isISO8601().toDate().withMessage('Invalid date format')
]);
