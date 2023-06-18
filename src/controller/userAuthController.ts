import { UserAuthService } from "../services/userAuthServices";
import * as constants from "../utils/constant";
import * as appUtils from "../utils/appUtils";
import { msg } from "../utils/message"

const userAuthService = new UserAuthService();



export class UserAuthController {

    /**
     * signup
     * @param req :[email,fname,lname,phoneno]
     * @param res 
    */
    public async userSignUp(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.userSignUp(req.body);
            appUtils.successRes(res, responseFromService, msg.SIGNUP_SUCCESS)
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code)
        }

    }
     /**
    * login
    * @param req :[phoneno/email, password]
    * @param res 
    */
     public async login(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.login(req.body);
            appUtils.successRes(res, responseFromService, msg.LOGIN);
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);
        }
    }

    /**
     * verify Otp
     * @param req :[phoneno, otp]
     * @param res 
    */
    public async verifyUserOtp(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.verifyUserOtp(req.body);
            appUtils.successRes(res, responseFromService, msg.OTP_VERIFIED)
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);
        }
    }

    /**
     * resend Otp
     * @param req :[phoneno]
     * @param res 
    */
    public async resendOtp(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.resendOtp(req.body);
            appUtils.successRes(res, responseFromService, msg.RESEND_OTP);
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);

        }
    }

    /**
     * forgot  password
     * @param req :[phoneno/email]
     * @param res 
    */
    public async forgotPassword(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.forgotPassword(req.body);
            appUtils.successRes(res, responseFromService, msg.FORGOT_PASSWORD_OTP)
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);
        }
    }

    /**
     * set new  password
     * @param req :[phoneno, password, newPassword]
     * @param res 
    */
    public async setNewPassword(req: any, res: any) {
        try {
            const responseFromService = await userAuthService.setNewPassword(req.body);
            appUtils.successRes(res, responseFromService, msg.PASSWORD_CHANGED_SUCCESSFULLY)
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);
        }
    }

}