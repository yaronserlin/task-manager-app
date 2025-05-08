/**
 * validateMiddleware
 * ------------------
 * Wraps a Joi schema; if validation fails, responds with 400 + details.
 */
const validate =
    (schema) =>
        (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    message: 'Validation error',
                    details: error.details.map((d) => d.message),
                });
            }
            next();
        };

module.exports = validate;