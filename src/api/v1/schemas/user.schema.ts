import Joi from "joi";

export const NewUserSchema = Joi.object({
    body: Joi.object({
        role_id: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        username: Joi.string().optional(),
        password: Joi.string().optional()
    }),
    query: {}
});

export const SendOTPSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required()
    }),
    query: {}
});

export const VerifyOTPSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().integer().min(100000).max(999999).required()
    }),
    query: {}
});

export const registerSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().integer().min(100000).max(999999).required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,}$')).required(),
      }),
      query: {}
});

export const loginSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,}$')).required(),
      }),
      query: {}
});

export const createPaymentIntentSchema = Joi.object({
    body: Joi.object({
        bookId: Joi.string().guid().required()
      }),
      query: {}
});