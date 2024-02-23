import * as dotenv  from "dotenv";

dotenv.config();


export const userInfo = {
    "valid": {
        "username": process.env.rpUsername,
        "password": process.env.rpPassword,
    },
    "invalid": {
        "username": "wrong",
        "password": "wrong",
    }
};

export const message = {
    "loginSuccess" : "Signed in successfully",
    "loginFail" : "An error occurred while connecting to server: You do not have enough permissions. Bad credentials",
};