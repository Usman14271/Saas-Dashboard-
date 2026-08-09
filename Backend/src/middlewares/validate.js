import {apiError} from "../uttils/apiError.js";

const validate = (schema) => {

    return (req, res, next) => {

        const data = {
            body: req.body,
            params: req.params,
            query: req.query,
        };

        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            
            return res.status(400).json({
                success: false,
                errors: error.details.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }

        req.body = value.body || {};
        Object.assign(req.params, value.params || {});
        Object.assign(req.query, value.query || {});
        // req.params = value.params || {};
        // req.query = value.query || {};

        next();
    };

};

export default validate;