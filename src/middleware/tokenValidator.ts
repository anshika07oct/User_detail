import * as constants from '../utils/constant'
import jwt from 'jsonwebtoken';
import { msg } from "../utils/message";

// This method is used to authenticate and authorize user token
export const authenticateAndAuthorizeUserToken = (authorizeRoles = []) => {
    return async function (req, res, next) {
        let response = { ...constants.defaultServerResponse };
        try {
            if (!req.get("authorization")) {
                throw new Error(msg.TOKEN_MISSING);
            }
            const token = req.get("authorization");
            const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
            req.user = decoded;
            if (authorizeRoles.includes(req.user.role)) {
                return next();
            }
            else {
                response.message = msg.UNAUTHORISED_ACCOUNT;
                response.status = 401;
                return res.status(response.status).send(response);
            }
        } catch (error) {
            response.message = error.message;
            response.status = 401;
        }
        return res.status(response.status).send(response);
    }
};

export const forgotPasswordTokenResponse = async (obj: any) => {
    const token = jwt.sign(
        {
            id: obj.id
        },
        process.env.USER_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return { token };
}