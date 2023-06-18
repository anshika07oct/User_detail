import express from "express"
const userRoute = express.Router()
import { UserAuthController } from "../controller/userAuthController";
import { UserMgmtController } from "../controller/userMgmtController";
import * as joiSchemaValidation from "../middleware/joiSchemaValidation";
import * as userSchema from "../apiSchema/userSchema";
import * as tokenValidator from "../middleware/tokenValidator";
import * as constants from "../utils/constant";


let userAuthController = new UserAuthController();
let userMgmtController = new UserMgmtController();


//Route to signup
userRoute.post('/signUp', joiSchemaValidation.validateBody(userSchema.userSignUp), userAuthController.userSignUp);
// Route to verify otp
userRoute.post('/verifyOtp', userAuthController.verifyUserOtp);

// Route to resend otp
userRoute.put('/resendOtp', joiSchemaValidation.validateBody(userSchema.resendOtp), userAuthController.resendOtp);

// Route to Forgot password
userRoute.put('/forgotPassword', joiSchemaValidation.validateBody(userSchema.forgotPassword), userAuthController.forgotPassword);

//Route to setnew password
userRoute.put('/setNewPassword', joiSchemaValidation.validateBody(userSchema.setNewPassword), userAuthController.setNewPassword);

// Route to login user
userRoute.post('/login', userAuthController.login);

// Route to change password
userRoute.put('/changePassword', joiSchemaValidation.validateBody(userSchema.changePassword), userMgmtController.userChangePassword);



export = userRoute;