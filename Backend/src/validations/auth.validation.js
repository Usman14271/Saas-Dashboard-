import Joi from "joi";

export const registerUserValidation = Joi.object({
    body: Joi.object({
    
    fullName: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name cannot exceed 50 characters",
            "any.required": "Full name is required"
        }),

    username: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username cannot exceed 30 characters",
            "any.required": "Username is required"
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required"
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^(?:\+92|0092|0)3[0-9]{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Please provide a valid Pakistani phone number",
            "any.required": "Phone number is required"
        }),

    address: Joi.object({
        street: Joi.string()
            .trim()
            .max(100)
            .optional(),

        city: Joi.string()
            .trim()
            .max(50)
            .optional(),

        state: Joi.string()
            .trim()
            .max(50)
            .optional(),

        postalCode: Joi.string()
            .trim()
            .max(20)
            .optional(),

        country: Joi.string()
            .trim()
            .default("Pakistan")
            .optional()
    }).optional(),

    password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 30 characters",
            "any.required": "Password is required"
        }),
    })
});

export const loginUserValidation = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .trim()
            .lowercase()
            .email()
            .required()
            .messages({
                "string.empty": "Email is required",
                "string.email": "Please provide a valid email address",
                "any.required": "Email is required"
            }),
        password: Joi.string()
            .min(8)
            .max(30)
            .required()
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password cannot exceed 30 characters",
                "any.required": "Password is required"
            })
    })
});

export const changePasswordValidation = Joi.object({
    body: Joi.object({
        // currentPassword: Joi.string()
        //     .trim()
        //     .lowercase()
        //     .email()
        //     .required()
        //     .messages({
        //         "string.empty": "Email is required",
        //         "string.email": "Please provide a valid email address",
        //         "any.required": "Email is required"
        //     }),
        // newPassword: Joi.string()
        //     .min(8)
        //     .max(30)
        //     .required()
        //     .messages({
        //         "string.empty": "Password is required",
        //         "string.min": "Password must be at least 8 characters",
        //         "string.max": "Password cannot exceed 30 characters",
        //         "any.required": "Password is required"
        //     })
    })
});