const _ = require('lodash');
import { userModel } from "../models/user";
import * as constants from "../utils/constant";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
import * as appUtils from "../utils/appUtils";
import * as queryService from '../queryService';
import * as tokenResponse from "../utils/tokenResponse";
import * as helperFunction from "../utils/helperFunction";
import { msg } from "../utils/message";


export class UserAuthService {

    /** Method to SignUp  */
    public async userSignUp(params: any) {
        try {
            let condition: any = { where: { email: params.email.toLowerCase(), phoneNumber: params.phoneNumber } }
            const userExist = await queryService.selectOne(userModel, condition)
            if (!_.isEmpty(userExist)) {
                if (userExist.isSignUpCompleted) {
                    throw msg.EMAIL_ALREADY_EXIST;
                }
                else if (userExist.isphoneNumberVerified) {
                    let attributes = ['id', 'isPhoneNumberVerifid', 'isSignUpCompleted', 'createdAt']
                    const resp = _.pick(userExist, attributes)
                    return resp
                }
                else {
                    // isSignUpcompleted = false && isPhoneNumberVerified = false
                    // then send to phoneNumberVerify screen
                    let attributes = ['id', 'isSignUpCompleted', 'isPhoneNumberVerified']
                    const resp = _.pick(userExist, attributes)
                    console.log("resp", attributes)
                    return resp
                }
            }
            // user not exist , create user 
              let otp = await this.sendOtp(params);
            params.countryCode = '+' + constants.COUNTRY_CODE
            params.otp = otp;
            params.otpExpire = await appUtils.currentUnixTimeStamp()
            params.email = params.email.toLowerCase()
            
            let newUser = await queryService.addData(userModel, params)
            const resp = _.pick(newUser, ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt'])
            return resp
        } catch (error) {
            throw new Error(error);
        }
    }


    /** Method to Verify Otp */
    public async verifyUserOtp(params: any) {
        try {
            let condition;
            condition = { where: { phoneNumber: params.phoneNumber } };
            let User = await queryService.selectOne(userModel, condition);
            let userdata = JSON.parse(JSON.stringify(User))
            if (_.isEmpty(userdata)) {
                throw msg.USERNOTFOUND;
            }
            if (userdata.otp) {
                let time = appUtils.calcluateOtpTime(userdata.otpExpire);
                if (userdata.otp != params.otp) {
                    throw msg.INVALID_OTP;
                } else if (appUtils.currentUnixTimeStamp() - time > constants.otp_expiry_time) {
                    throw msg.ERROR_OTP_EXPIRED;
                } else {
                    let update = { isPhoneNumberVerified: true };
                    condition = { where: { id: userdata.id } };
                    await queryService.updateData(userModel, update, condition)
                    userdata.isPhoneNumberVerified = true;
                    return userdata;
                }
            }
        } catch (error) {
            throw new Error(msg.BAD_REQUEST)
        }
    }


    /** Method to Resend Otp */
    public async resendOtp(params: any) {
        try {
            let query = { where: { phoneNumber: params.phoneNumber } }
            let User = await queryService.selectOne(userModel, query)
            let userdata = JSON.parse(JSON.stringify(User))

            if (_.isEmpty(userdata)) {
                throw msg.USERNOTFOUND
            } else {
                let otp = await this.sendOtp(User);
               
                if (otp != null) {
                    let condition = { where: { id: User.id } }
                    let updatedata = {
                        otp: otp, otpExpire: Date.now() + 300000
                    }
                    await userModel.update(updatedata, condition)
                    return otp
                }
                else {
                    throw new Error(msg.USERNOTFOUND)
                }
            }
        } catch (error) {
            throw new Error(msg.BAD_REQUEST)
        }
    }

      /** Method for User Login */
      public async login(params: any) {
        try {
            if (params.phoneNumber) {
                const userExist = await queryService.selectOne(userModel, { where: { phoneNumber: params.phoneNumber }, raw: true });
               // **** if user does not exiust thn throws a error message
                if (!userExist) {
                    throw new Error(msg.USERNOTFOUND)
                }
                if (userExist.isPhoneNumberVerified != true) {
                    throw new Error(msg.PHONE_NO_NOT_VERIFIED)
                }
                if (!_.isEmpty(userExist)) {
                    let comparePassword = await appUtils.comparePassword(params.password, userExist.password)
                    if (comparePassword) {
                        let tokenData = <any>{
                            id: userExist.id,

                        }
                        let token = await tokenResponse.userTokenResponse(tokenData);
                        delete userExist.password
                        return { ...token, ...userExist }
                    } else {
                        throw msg.INVAILD_PASSWORD
                    }
                }

            } else if (params.email) {
                const user = await queryService.selectOne(userModel, { where: { email: params.email.toLowerCase() }, raw: true });
                if (!user) {
                    throw new Error(msg.USERNOTFOUND)
                }
                
                if (user.isPhoneNumberVerified != true) {
                    throw new Error(msg.PHONE_NO_NOT_VERIFIED)
                }
                if (!_.isEmpty(user)) {
                    let comparePassword = await appUtils.comparePassword(params.password, user.password)
                    if (comparePassword) {
                        let tokenData = <any>{
                            id: user.id,
                             
                        }
                        let token = await tokenResponse.userTokenResponse(tokenData);
                        delete user.password
                        return { ...token, ...user }
                    } else {
                        throw msg.INVAILD_PASSWORD
                    }
                }
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    /** Method to Forgot Password */
    public async forgotPassword(params: any) {
        try {
            if (params.phoneNumber) {
                let query = { where: { phoneNumber: params.phoneNumber } };
                let userExist = await queryService.selectOne(userModel, query);
                if (_.isEmpty(userExist)) {
                    throw msg.USERNOTFOUND;
                }
                else {
                    let update = <any>{};
                     let otp = await this.sendOtp(userExist)
                    let model = userModel
                    if (otp != null) {
                        update.otp = otp;
                        update.otpExpire = appUtils.getUnixTimeStamp(Math.floor(Date.now()), 60);
                        let condition = { where: { id: userExist.id } }
                        let response = await queryService.updateData(model, update, condition)
                        return response;
                    }
                }
            }
            if (params.email) {
                let query = { where: { email: params.email.toLowerCase() } };
                let user = await queryService.selectOne(userModel, query)
                if (_.isEmpty(user)) {
                    throw msg.USERNOTFOUND;
                }
                else {
                    params.email = params.email.toLowerCase()
                    let query: any = { where: { email: params.email } };
                    query.raw = true;
                    let existingUser = await queryService.selectOne(userModel, query);
                    if (!_.isEmpty(existingUser)) {
                        if (existingUser.status === 1) {
                            let otp = appUtils.generateOtp();
                            const mailParams = <any>{};
                            mailParams.to = existingUser.email;
                            mailParams.html = `Hi, 
                        <br> Hlo, please enter the otp:${otp} to reset your passowrd for your ${existingUser.email} account
                        <br> If you didn't ask to reset your password,you can ignore this email
                        <br> Thanks
                        <br>  Support Team`;
                            mailParams.subject = "Reset Password Request";
                            mailParams.name = "TESTING DATA"

                            if (!_.isEmpty(mailParams) && !_.isEmpty(otp)) {
                                console.log('mailparams', mailParams)
                                await helperFunction.sendEmail(mailParams);
                                let token = await tokenResponse.userTokenResponse(existingUser);
                                let update = {
                                    'otp': otp,
                                    'otp_expire': appUtils.getUnixTimeStamp(Math.floor(Date.now()), 0),
                                };
                                let condition = {
                                    where: {
                                        email: existingUser.email.toLowerCase()
                                    },
                                    raw: true
                                }
                                await queryService.updateData(userModel, update, condition);
                                return { email: params.email };
                            } else {
                                throw new Error(msg.WRONG_VERIFICATION_ERROR);
                            }
                        } else {
                            throw new Error(msg.DELETE_ACCOUNT);
                        }
                    } else {
                        throw new Error(msg.USERNOTFOUND);
                    }
                }
            }
            // if email/phone not exist
            throw msg.INVALID_CREDENTIALS
        } catch (error) {
            throw new Error(msg.BAD_REQUEST)
        }
    }


    /** Method to Set New Password */
    // public async setNewPassword(params: any) {
    //     try {
    //         let query = { where: { phoneNumber: params.phoneNumber } };
    //         let userExist = await queryService.selectOne(userModel, query);
    //         if (_.isEmpty(userExist)) {
    //             throw msg.USERNOTFOUND;
    //         }
    //         let comparePassword = params.password === params.confirm_Password;
    //         // if (_.isEmpty(comparePassword)){
    //         if (!comparePassword) {
    //             throw msg.SAME_PASSWORD;
    //         }
    //         else {
    //             let condition = <any>{ where: { id: userExist.id } },
    //                 update = <any>{};
    //             // let passwordhash = await appUtils.bcryptPassword(params.password);
    //             update.password = params.password;
    //             var data = await queryService.updateData(userModel, update, condition);
    //             return data
    //         }
    //     } catch (error) {
    //         throw new Error(msg.BAD_REQUEST);
    //     }

    // }
    public async setNewPassword(params: any) {
        try {
            let query: any = {};
            query.email = params.email.trim();
            query.isCompleted = true;
            let userDetail;
            let comparePassword = params.password === params.confirm_Password;
            if (comparePassword) {
                userDetail = await userModel.findOne({ where: query })
                if (!userDetail) {
                    throw new Error(msg.USERNOTFOUND)
                }
                if (userDetail.emailOtpExpiry) {
                    if (Date.now() > Number(userDetail.emailOtpExpiry))
                        throw new Error(msg.ERROR_OTP_EXPIRED);
                    if (params.otp != userDetail.otp)
                        throw new Error(msg.INVALID_OTP);
                    if (userDetail.otp == params.otp) {
                        const validPassword = await appUtils.comparePassword(params.password, userDetail.password);
                        if (validPassword)
                            throw new Error(msg.CURRENT_PASSWORD_ALREADY_USED);
                        let passwordhash = await appUtils.bcryptPassword(params.password);
                        let result = await userModel.update({ password: passwordhash, otp: null, emailOtpExpiry: null }, { where: query });
                        return result
                    }
                }
                else {
                    throw new Error(msg.ERROR_OTP_EXPIRED);
                }
            }
            else {
                throw new Error(msg.SAME_PASSWORD);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }


    /** function for send Otp */
    async sendOtp(params: any) {
        try {
            // const country_code = 91;
            let Phoneno = '+' + constants.COUNTRY_CODE + params.phoneNumber;
            let otp = await appUtils.generateOtp()
            console.log("OTP=>", otp)
            let message = `${msg.MOBILE_OTP_MSG} ${otp}`
            await client.messages.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `${Phoneno}`,
                body: `${message}`
            })
            return otp
        } catch (error) {
            throw new Error(error)
        }
    }


}






