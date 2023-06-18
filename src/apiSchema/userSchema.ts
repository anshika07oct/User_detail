
import Joi from 'joi';
import { msg } from '../utils/message';
import * as constants from '../utils/constant';

export const userSignUp = Joi.object({
    email: Joi.string().regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required().messages({
        "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.email_msg.pattern
    }),
    name: Joi.string().max(100).required(),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.number().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required()
});

export const resendOtp = Joi.object({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.number().required()
});



export const forgotPassword = Joi.object({
    phoneNumber: Joi.number().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number"),
    email: Joi.string().regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).messages({
        "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.email_msg.pattern
    }),

})

export const setNewPassword = Joi.object({
    phoneNumber: Joi.number().min(1000000000).message("invalid phone number").max(9999999999).message("Invalid phone number").optional(),
    email: Joi.string().regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required().messages({ "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.email_msg.pattern }).optional(),
    password: Joi.string()
        .min(8)
        .max(15)
        .regex(/[a-z]{1,}/).message("Password must contain one captital Letter")
        .regex(/[A-Z]{1,}/).message("Password must contain one captital Letter")
        .regex(/[0-9]{1,}/).message("Password must contain one number")
        .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/).message("Password contain one special character")
        .regex(new RegExp('^\\S*$')).message("Password cann't contain space")
        .required()
        .messages({
            "string.min": constants.CUSTOM_JOI_MESSAGE.password_msg.min,
            "string.max": constants.CUSTOM_JOI_MESSAGE.password_msg.max,
            "string.base": constants.CUSTOM_JOI_MESSAGE.password_msg.base,
            "string.empty": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "any.required": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.password_msg.pattern
        }),
    confirm_Password: Joi.string()
        .min(8)
        .max(15)
        .regex(/[a-z]{1,}/).message("Confirm Password must contain one captital Letter")
        .regex(/[A-Z]{1,}/).message("Confirm Password must contain one captital Letter")
        .regex(/[0-9]{1,}/).message("Confirm Password must contain one number")
        .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/).message("Confirm Password contain one special character")
        .regex(new RegExp('^\\S*$')).message("Confirm Password cann't contain space")
        .required()
        .messages({
            "string.min": constants.CUSTOM_JOI_MESSAGE.password_msg.min,
            "string.max": constants.CUSTOM_JOI_MESSAGE.password_msg.max,
            "string.base": constants.CUSTOM_JOI_MESSAGE.password_msg.base,
            "string.empty": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "any.required": constants.CUSTOM_JOI_MESSAGE.password_msg.required,
            "string.pattern.base": constants.CUSTOM_JOI_MESSAGE.password_msg.pattern
        }),
})

export const updateProfile = Joi.object({
    phoneNumber: Joi.number().min(1000000000).message(`${msg.INVALID_PHONE}`).max(9999999999).message(`${msg.INVALID_PHONE}`).required(),
    bio: Joi.string().required(),
    location: Joi.string().required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required().messages({
        "string.pattern.base": msg.INVALID_EMAIL
    }),
    countryCode: Joi.string().required(),
    profilePic: Joi.string(),
    isPublic: Joi.boolean().optional()

});


export const changePassword = Joi.object({
    oldPassword: Joi.string()
        .min(8)
        .max(15)
        .regex(/[a-z]{1,}/).message("Old Password must contain one captital Letter")
        .regex(/[A-Z]{1,}/).message("Old Password must contain one captital Letter")
        .regex(/[0-9]{1,}/).message("Old Password must contain one number")
        .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/).message("Old Password contain one special character")
        .regex(new RegExp('^\\S*$')).message("Old Password cann't contain space")
        .required(),
    confirmNewPassword: Joi.string()
        .min(8)
        .max(15)
        .regex(/[a-z]{1,}/).message("Confirm new Password must contain one captital Letter")
        .regex(/[A-Z]{1,}/).message("Confirm new Password must contain one captital Letter")
        .regex(/[0-9]{1,}/).message("Confirm new Password must contain one number")
        .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/).message("Confirm new Password contain one special character")
        .regex(new RegExp('^\\S*$')).message("Confirm new Password cann't contain space")
        .required(),
    newPassword: Joi.string()
        .min(8)
        .max(15)
        .regex(/[a-z]{1,}/).message("New Password must contain one captital Letter")
        .regex(/[A-Z]{1,}/).message("New Password must contain one captital Letter")
        .regex(/[0-9]{1,}/).message("New Password must contain one number")
        .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/).message("New Password contain one special character")
        .regex(new RegExp('^\\S*$')).message("New Password cann't contain space")
        .required(),
})

export const userListing = Joi.object({
    skip: Joi.number().integer().required()
        .messages({
            "integer.base": msg.FEILD_BASE.replace("{{field}}", "Skip").replace("{{dataType}}", "integer"),
            "integer.empty": msg.FEILD_REQUIRED.replace("{{field}}", "Skip"),
            "any.required": msg.FEILD_REQUIRED.replace("{{field}}", "Skip"),
        }),
    limit: Joi.number().integer().required()
        .messages({
            "integer.base": msg.FEILD_BASE.replace("{{field}}", "Limit").replace("{{dataType}}", "integer"),
            "integer.empty": msg.FEILD_REQUIRED.replace("{{field}}", "Limit"),
            "any.required": msg.FEILD_REQUIRED.replace("{{field}}", "Limit"),
        }),
    searchKeyword: Joi.string().allow(null, "").optional(),
});




