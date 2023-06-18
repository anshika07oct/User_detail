import _ from "lodash";
import { msg } from "../src/utils/message";

export const selectOne = async (model: any, condition: any) => {
    try {
        let selectQueryServiceData;
        if (!_.isEmpty(model)) {
            if (!_.isEmpty(condition)) {
                selectQueryServiceData = await model.findOne(condition);
            } else {
                throw new Error(msg.REQUEST_VALIDATION_MESSAGE);
            }
        } else {
            throw new Error(msg.MODEL_NAME_REQUIRED);
        }
        return selectQueryServiceData;
    } catch (error) {
        throw new Error(error);
    }
}


export const updateData = async (model: any, params: any, condition: any) => {
    try {
        let updateQueryServiceData
        console.log('params - - ', params, 'cond - - ', condition)
        if (!_.isEmpty(model)) {
            if (!_.isEmpty(params) && !_.isEmpty(condition)) {
                condition.individualHooks = true;
                updateQueryServiceData = await model.update(params, condition);
            } else {
                throw new Error(msg.REQUEST_VALIDATION_MESSAGE);
            }
        } else {
            throw new Error(msg.MODEL_NAME_REQUIRED);
        }
        return updateQueryServiceData;
    } catch (error) {
        throw new Error(error);
    }
}


export const addData = async (model: any, data: any) => {
    try {
        if (!_.isEmpty(model)) {
            if (!_.isEmpty(data)) {
                return model.create(data);
            } else {
                throw new Error(msg.REQUEST_VALIDATION_MESSAGE);
            }
        } else {
            throw new Error(msg.MODEL_NAME_REQUIRED);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const createOne = async (model: any, params: any) => {
    try {
        return await model.create(params);
    } catch (error) {
        throw error;
    }
}

export const getAll = async (model: any, params: any) => {
    try {
        return await model.findAndCountAll(params);
    } catch (error) {
        throw error;
    }
}

export const totalCount = async (model: any, params: any) => {
    try {
        return await model.count(params);
    } catch (error) {
        throw error;
    }
}
