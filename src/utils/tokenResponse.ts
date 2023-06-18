import jwt from "jsonwebtoken";
import * as constants from "../utils/constant";
const dotenv = require("dotenv");
dotenv.config();

export const userTokenResponse = async(obj: any) =>{
    const token  = jwt.sign(
        {
            id: obj.id
        }, 
         constants.USER_SECRET_KEY
    )
    console.log('token',token)
    return { token }

}
