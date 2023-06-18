// import { DataTypes } from    "sequelize";
const DataTypes = require('sequelize');
import { sequelize } from "../connection";

export const userModel: any = sequelize.define("user",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    
    isPhoneNumberVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isSignUpCompleted: {
        type: DataTypes.BOOLEAN,    
        defaultValue: false
    },

    otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    otp_expire: {
        type: DataTypes.DATE,
        allowNull: true
    },
    otp_verified: {
        type: DataTypes.INTEGER,     // 0--->not verified, 1---->verified
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.INTEGER,     // 1--->active, 2--->block, 3--->report
        allowNull: true,
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
},
    {
        tableName: "user"
    }
);
userModel.sync({ alter: true});
