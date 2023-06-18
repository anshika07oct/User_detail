import * as queryService from "../queryService";
import { userModel } from "../models/user";
import * as appUtils from "../utils/appUtils";
import { msg } from "../utils/message";
import _ from "lodash";

export class UserMgmtService {

    public async userChangePassword(params: any, userId: any) {
        if (params.newPassword !== params.confirmNewPassword) {
            throw new Error(msg.SAME_PASSWORD)
        }
        let userDetail = await userModel.findOne({ where: { id: userId.id } })
        let comparePassword = await appUtils.comparePassword(params.oldPassword, userDetail.password);
        if (comparePassword) {
            let passwordhash = await appUtils.bcryptPassword(params.newPassword);
            let newpassvalidation = await appUtils.comparePassword(params.newPassword, userDetail.password);
            if (newpassvalidation) {
                throw new Error(msg.NEW_PASSWORD_SAME)
            }
            let query = { where: { id: userId.id } }
            let update = <any>{};
            query.where.id = userId.id;
            update.password = passwordhash;
            return queryService.updateData(userModel, update, query);
        } else {
            throw new Error(msg.ENTER_VALID_PASSWORD)
        }
    }


}