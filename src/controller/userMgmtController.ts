import { UserMgmtService } from "../services/userMgmtService"
import * as constants from '../utils/constant';
import * as appUtils from '../utils/appUtils';
import { msg } from '../utils/message';

const changePasswordService = new UserMgmtService();

export class UserMgmtController {

    public async userChangePassword(req: any, res: any) {
        try {
            let responseFromService: any;
            responseFromService = await changePasswordService.userChangePassword(req.body, req.user)
            appUtils.successRes(res, responseFromService, msg.PASSWORD_CHANGED_SUCCESSFULLY);
        } catch (error) {
            appUtils.errorRes(res, error, constants.code.error_code);
        }
    }

}