import * as constants from "./constant";
import { msg } from "./message";
import _ from 'lodash';

const randomString = require("randomstring");
const bcrypt = require('bcrypt');
/* function for sending the error response */
export const errorRes = (res: any, error: any, errorCode: any, message = msg.BAD_REQUEST) => {
    let response = { ...constants.defaultServerResponse };
    error = _.isArray(error) ? error[0] : error;

    if (!_.isEmpty(error.message)) {
        if (error.message == 'SequelizeUniqueConstraintError: Validation error') {
            response.message = msg.DUPLICATE_VALUE;
        } else {
            response.message = error.message;
        }
    } else {
        response.message = error;
    }
    response.success = false;
    response.status = errorCode;
    response.body = _.isArray(error) ? error[0].path : { path: error.path }
    return res.status(response.status).send(response);
};

/* function for sending the success response */
export const successRes = (res: any, params: any, message: any) => {
    let response = { ...constants.defaultServerResponse };
    response.success = true;
    if (params) {
        response.body = { data: params };
    }
    response.message = message;
    response.status = <number>200;
    return res.status(response.status).send(response);
}


/** function to bcrypt the password */
export const bcryptPassword = async (myPlaintextPassword) => {
    return bcrypt.hash(myPlaintextPassword, 10);
}




/** functon to compare the password */
export const comparePassword = async (myPlaintextPassword, hash) => {
    return bcrypt.compare(myPlaintextPassword, hash);
}
export const generateRandom = (length) => {
    let reqLen = Math.pow(10, (length - 1));
    return Math.round(reqLen + (Math.random() * reqLen * 9));
}
/** function for generate the random number */
export const generateOtp = ()=>{
    const otp = randomString.generate({
        charset: 'numeric',
        length: 4,
        numeric: true,
        letters: false,
        special: false,
        exclude: ["0"],
    })
    return otp;
}

/**function to get the time*/
export const calcluateOtpTime = (date: any) => {
    var d = new Date(date);
    var t = d.getTime();
    return Math.floor(t);
}

/** function to get the current time value*/
export const currentUnixTimeStamp = () => {
    return Math.floor(Date.now());
}

/** function to  get the current time value */
export const getUnixTimeStamp = (date: any, n: number) => {
    var d = new Date(date);
    return d.getTime() + n * 60000;
}












