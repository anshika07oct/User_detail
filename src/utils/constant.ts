export const defaultServerResponse = {
    status: 400,
    success: false,
    message: '',
    body: {}
}

export const code = {
    error_code: 400,
    access_denied: 403,
    unauthorized: 401,
    unAuthorizedByStatus:402
}

export const USER_SECRET_KEY = "S$%^!@#K";



export const CUSTOM_JOI_MESSAGE = {
    password_msg: {
      min: "Password must have minimum 8 characters.",
      max: "Password can not have more than 15 characters.",
      base: "Password must be string.",
      required: "Password is required.",
      pattern: "Password must have 8-15 characters comprising one caps, one small, one number and one special character from (!, @, #, $, %, ^, &, *)."
    },
    email_msg: {
      pattern: "Email address is invalid."
    },
    phone_no_msg: {
      pattern: "Please enter a valid phone no."
    },
    name_msg: {
      pattern: "Please enter a valid name."
    },
  }
export const otp_expiry_time = 120000
export const COUNTRY_CODE = '91'
























